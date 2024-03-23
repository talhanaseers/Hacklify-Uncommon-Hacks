// This file is intentionally not referenced anywhere. It will be part of the backend once lambda functions are implemented.

// npm install @tensorflow/tfjs-node
// npm install @tensorflow/tfjs @tensorflow-models/universal-sentence-encoder 


require("@tensorflow/tfjs-node");
const sentence_encoder = require("@tensorflow-models/universal-sentence-encoder");

class RecommendationSystem {
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
}

class Hacker {
  constructor(name, skills, interests, goal) {
    this.name = name;
    this.skills = skills;
    this.interests = interests;
    this.goal = goal;
    this.goalEmbedding = null;
  }

  // Score compatibility higher if the two hackers have similar goals
  goalCompatibilityWith(otherHacker) {
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
    return this.skills.length - difference.length;
  }

  // Score compatibility higher if the two hackers have similar interests
  interestDiversityWith(otherHacker) {
    let interestsIntersection = this.interests.filter((value) =>
      otherHacker.interests.includes(value)
    );
    return interestsIntersection.length;
  }

  compatibilityWith(otherHacker) {
    let goalCompatibility = this.goalCompatibilityWith(otherHacker);
    let skillDiversity = this.skillDiversityWith(otherHacker);
    let interestDiversity = this.interestDiversityWith(otherHacker);
    return goalCompatibility + skillDiversity + interestDiversity;
  }
}

async function main() {
  let recommendationSystem = new RecommendationSystem();
  let hacker1 = new Hacker(
    "Hacker1",
    ["JavaScript", "Python"],
    ["Web Development", "Machine Learning"],
    "I want to create a web app that uses machine learning."
  );
  let hacker2 = new Hacker(
    "Hacker2",
    ["Java", "C++"],
    ["Game Development", "Artificial Intelligence"],
    "I want to create a game that uses AI."
  );
  let hacker3 = new Hacker(
    "Hacker3",
    ["Python", "C++"],
    ["Machine Learning", "Game Development"],
    "I want to meet new people and learn new things."
  );
  recommendationSystem.addHacker(hacker1);
  recommendationSystem.addHacker(hacker2);
  recommendationSystem.addHacker(hacker3);
  await recommendationSystem.embedHackers();
  recommendationSystem.findMatches(hacker1);
}

main();
