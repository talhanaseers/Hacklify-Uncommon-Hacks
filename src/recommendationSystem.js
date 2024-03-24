require('@tensorflow/tfjs');
const sentence_encoder = require('@tensorflow-models/universal-sentence-encoder');

export class RecommendationSystem {
  constructor() {
    this.hackers = [];
    this.cachedModel = null;
  }

  async model() {
    if (this.cachedModel === null) {
      this.cachedModel = await sentence_encoder.load();
    }
    return this.cachedModel;
  }

  addHacker(hacker) {
    this.hackers.push(hacker);
  }

  async embedHackers() {
    let model = await this.model();

    let goals_sentences = this.hackers.map((hacker) => hacker.goal);
    let goalEmbeddings = await model.embed(goals_sentences);
    for (let i = 0; i < this.hackers.length; i++) {
      this.hackers[i].goalEmbedding = goalEmbeddings.slice([i, 0], [1, -1]);
    }
  }

  // Find matches for a hacker
  findMatches(hacker) {
    for (let otherHacker of this.hackers) {
      if (otherHacker === hacker) {
        continue;
      }
      let compatibility = hacker.compatibilityWith(otherHacker);
      console.log(
        `Similarity between ${hacker.name} and ${otherHacker.name}: ${compatibility}`
      );
    }
  }

  // Score a group of hackers based on their compatibility
  scoreGroup(group) {
    let score = 0;
    if (group.length <= 1) {
      return 0;
    }
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        score += group[i].compatibilityWith(group[j]);
      }
    }
    return score;
  }

  // Find a bunch of groups of hackers that are most compatible with each other
  findGroups(groupSize) {
    let annealing = new Annealing(this.scoreGroup, 20, 10, 0.1);
    return annealing.anneal(this.hackers, groupSize);
  }
}

export class Hacker {
  constructor(name, skills, interests, goal) {
    this.name = name;
    this.skills = skills;
    this.interests = interests;
    this.goal = goal;
    this.goalEmbedding = null;
  }

  // Score compatibility higher if the two hackers have similar goals
  goalCompatibilityWith(otherHacker) {
    if (!this.goalEmbedding || !otherHacker.goalEmbedding) {
      return 0;
    }
    let similarity = this.goalEmbedding.dot(
      otherHacker.goalEmbedding.transpose()
    );
    return similarity.arraySync()[0][0];
  }

  // Score compatibility higher if the two hackers have differences in skills
  skillDiversityWith(otherHacker) {
    let difference = this.skills.filter(
      (value) => !otherHacker.skills.includes(value)
    );
    return (this.skills.length - difference.length) / this.skills.length;
  }

  // Score compatibility higher if the two hackers have similar interests
  interestSimilarityWith(otherHacker) {
    let interestsIntersection = this.interests.filter((value) =>
      otherHacker.interests.includes(value)
    );
    return interestsIntersection.length / this.interests.length;
  }

  compatibilityWith(otherHacker) {
    let goalCompatibility = this.goalCompatibilityWith(otherHacker) * 0.5;
    let interestSimilarity = this.interestSimilarityWith(otherHacker) * 0.4;
    let skillDiversity = this.skillDiversityWith(otherHacker) * 0.1;
    return goalCompatibility + interestSimilarity + skillDiversity;
  }
}

function structuredCloneNestedList(list) {
  return list.map((item) => {
    if (Array.isArray(item)) {
      return structuredCloneNestedList(item);
    } else {
      return item;
    }
  });
}

export class Annealing {
  constructor(scoreGroup, population, temperature, coolingRate) {
    this.scoreGroup = scoreGroup;
    this.population = population;
    this.temperature = temperature;
    this.coolingRate = coolingRate;
  }

  acceptRegardlessProbability(currentScore, newScore) {
    return Math.exp((currentScore - newScore) / this.temperature);
  }

  scoreGroups(groups) {
    return groups.reduce((sum, group) => sum * this.scoreGroup(group), 1);
  }

  anneal(items, groupSize) {
    let numberOfGroups = Math.ceil(items.length / groupSize);

    let maxItemsPerGroup = Math.ceil(items.length / numberOfGroups) + 2;
    let minItemsPerGroup = Math.max(
      Math.floor(items.length / numberOfGroups) - 2,
      1
    );

    let initialGroups = [];
    for (let i = 0; i < numberOfGroups; i++) {
      let group = [];
      for (let j = 0; j < groupSize; j++) {
        let item = items[i * groupSize + j];
        if (item) {
          group.push(item);
        }
      }
      initialGroups.push(group);
    }

    let population = [];
    for (let i = 0; i < this.population; i++) {
      population.push(structuredCloneNestedList(initialGroups));
    }

    let iteration = 0;
    while (this.temperature > 0.1) {
      for (let i = 0; i < this.population; i++) {
        let groups = population[i];
        let mutatedGroups = structuredCloneNestedList(groups);

        // Swap two people between two groups
        let moveFromGroup;
        let moveToGroup;
        let loopCount = 0;
        // Keep moving until we create a new group that
        do {
          moveFromGroup = Math.floor(Math.random() * numberOfGroups);
          moveToGroup = Math.floor(Math.random() * numberOfGroups);
          if (loopCount > 100) {
            break;
          }
          loopCount++;
        } while (
          moveToGroup === moveFromGroup ||
          groups[moveFromGroup].length - 1 <= minItemsPerGroup ||
          groups[moveFromGroup].length - 1 >= maxItemsPerGroup ||
          groups[moveToGroup].length + 1 <= minItemsPerGroup ||
          groups[moveToGroup].length + 1 >= maxItemsPerGroup
        );
        let moveItem = Math.floor(
          Math.random() * mutatedGroups[moveFromGroup].length
        );
        let item = mutatedGroups[moveFromGroup].splice(moveItem, 1)[0];
        mutatedGroups[moveToGroup].push(item);

        // Calculate current score
        let currentScore = this.scoreGroups(groups);
        // Calculate new score
        let newScore = this.scoreGroups(mutatedGroups);
        let probability = this.acceptRegardlessProbability(
          currentScore,
          newScore
        );
        if (newScore > currentScore || Math.random() < probability) {
          population[i] = mutatedGroups;
        }
      }
      this.temperature *= 1 - this.coolingRate;
      iteration++;
    }

    // Find and return the best group
    let bestScore = 0;
    let bestGroup = null;
    for (let i = 0; i < this.population; i++) {
      let score = this.scoreGroups(population[i]);
      if (score > bestScore) {
        bestScore = score;
        bestGroup = population[i];
      }
    }
    console.log("Best score: " + bestScore);
    return bestGroup;
  }
}

export function randomHacker() {
  let names = ["Evan", "Talha", "Cythia", "Nathan"];
  let skills = [
    "Rust",
    "Javascript",
    "Frontend",
    "Startups",
    "C++",
    "Backend",
    "AWS",
    "C",
    "Java",
    "C#",
  ];
  let interests = ["Web", "Machine Learning", "Game", "Algorithms"];
  let goals = [
    "Brainstorm innovative ideas for solving real-world problems using technology.",
    "Collaborate with like-minded individuals to develop creative solutions.",
    "Network with professionals from various industries, including tech, business, and design.",
    "Hone my coding and programming skills in a fast-paced environment.",
    "Gain hands-on experience with cutting-edge technologies and tools.",
    "Test my problem-solving abilities under pressure.",
    "Pitch my ideas to potential investors and mentors.",
    "Learn from experienced mentors and industry experts.",
    "Explore potential career opportunities with participating companies.",
    "Contribute to open-source projects and make a meaningful impact.",
    "Enhance my teamwork and communication skills through group projects.",
    "Participate in workshops and seminars to expand my knowledge base.",
    "Receive feedback and constructive criticism on my projects.",
    "Challenge myself to think outside the box and push creative boundaries.",
    "Build a prototype or minimum viable product (MVP) within a limited timeframe.",
    "Showcase my skills and accomplishments to a wider audience.",
    "Have fun and enjoy the camaraderie of fellow hackers and enthusiasts.",
    "Explore new technologies and emerging trends in the tech industry.",
    "Win prizes and recognition for outstanding achievements.",
    "Contribute to the culture of innovation and entrepreneurship within the tech community.",
  ];

  let name = names[Math.floor(Math.random() * names.length)];
  let skillCount = Math.floor(Math.random() * 5) + 1;
  let skillsList = [];
  for (let i = 0; i < skillCount; i++) {
    let skill = skills[Math.floor(Math.random() * skills.length)];
    if (!skillsList.includes(skill)) {
      skillsList.push(skill);
    }
  }

  let interestCount = Math.floor(Math.random() * 3) + 1;
  let interestsList = [];
  for (let i = 0; i < interestCount; i++) {
    let interest = interests[Math.floor(Math.random() * interests.length)];
    if (!interestsList.includes(interest)) {
      interestsList.push(interest);
    }
  }

  let goal = goals[Math.floor(Math.random() * goals.length)];
  return new Hacker(name, skillsList, interestsList, goal);
}
