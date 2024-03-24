import SiteNav from "../Common/SiteNav";
import SiteFooter from "../Common/SiteFooter";

import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../../aws-exports";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import {
  RecommendationSystem,
  randomHacker,
  Hacker,
} from "../../recommendationSystem";
import { readProfile } from "./Profile";

Amplify.configure(awsExports);

function createRecommendationSystem(me) {
  let recommendationSystem = new RecommendationSystem();
  let hackers = [];
  for (let i = 0; i < 20; i++) {
    let hacker = randomHacker();
    hacker.name = "Hacker " + i;
    hackers.push(hacker);
  }
  for (let hacker of hackers) {
    recommendationSystem.addHacker(hacker);
  }
  recommendationSystem.addHacker(me);

  return recommendationSystem;
}

function HackerCard({ hacker }) {
  return (
    <Card style={{ width: "18rem", padding: "10px" }}>
      <Card.Body>
        <Card.Title>{hacker.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            Knows:
            {hacker.skills.map((skill) => (
              <Badge
                pill
                key={`${skill}`}
                bg="primary"
                style={{ margin: "2px" }}
              >
                {`${skill}`}
              </Badge>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            Interested in:
            {hacker.interests.map((interest) => (
              <Badge
                pill
                key={`${interest}`}
                bg="secondary"
                style={{ margin: "2px" }}
              >
                {`${interest}`}
              </Badge>
            ))}
          </div>
        </Card.Subtitle>
        <Card.Text>Hackathon Goal {hacker.goal}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function Hackers({ name }) {
  let profile = readProfile();
  let me = new Hacker(
    name,
    profile.skills,
    profile.interests,
    profile.hackathon_goal
  );
  let [recommendationSystem, setRecommendationSystem] = useState(
    createRecommendationSystem(me)
  );
  useEffect(() => {
    recommendationSystem.embedHackers();
  });

  let [teamSize, setTeamSize] = useState(3);
  let [renderedTeamSize, setRenderedTeamSize] = useState(3);
  let [recommendedTeams, setRecommendedTeams] = useState([]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          padding: "10px",
        }}
      >
        {recommendationSystem.hackers.map((hacker) => (
          <HackerCard key={hacker.name} hacker={hacker} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Button
          onClick={() => {
            setRenderedTeamSize(teamSize);
            setRecommendedTeams(recommendationSystem.findGroups(
              teamSize
            ));
          }}
        >
          Form Teams
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "10px",
            marginLeft: "20px",
          }}
        >
          Team Size:&nbsp;
          <input
            type="number"
            value={teamSize}
            onChange={(event) => setTeamSize(event.target.value)}
            style={{ width: "80px" }}
          ></input>
        </div>
      </div>

      {recommendedTeams.map((team, index) => (
        <div key={index}>
          <h2>Team {index + 1}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${renderedTeamSize}, 1fr)`,
              gap: "10px",
              padding: "10px",
            }}
          >
            {team.map((hacker) => (
              <HackerCard key={hacker.name} hacker={hacker} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Matchmaking() {
  return (
    <Authenticator loginMechanism={["email"]}>
      {({ signOut, user }) => (
        <div>
          <SiteNav logOut={signOut} />
          <h1>Team Formation</h1>
          <Hackers name={user.username} />
          <SiteFooter />
        </div>
      )}
    </Authenticator>
  );
}
