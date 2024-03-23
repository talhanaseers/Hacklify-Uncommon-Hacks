import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import SiteNav from "../Common/SiteNav";
import SiteFooter from "../Common/SiteFooter";

import { React, useState } from "react";
import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import Form from "react-bootstrap/Form";

import awsExports from "../../aws-exports";
import { render } from "@testing-library/react";
Amplify.configure(awsExports);

const skills = [
  "C++",
  "Java",
  "React",
  "Backend",
  "Frontend",
  "Fullstack",
  "Database",
  "Cloud",
  "DevOps",
  "Testing",
  "Security",
  "Design",
  "UI/UX",
  "Mobile",
  "Web",
  "AI/ML",
  "IoT",
  "Blockchain",
  "AR/VR",
  "GameDev",
  "Robotics",
  "Hardware",
  "Networking",
  "Algorithms",
];

const interests = [
  "Backend",
  "Frontend",
  "Fullstack",
  "Design",
  "Mobile",
  "Web",
  "AI/ML",
  "IoT",
  "Blockchain",
  "AR/VR",
  "GameDev",
  "Robotics",
  "Networking",
];

export default function Profile() {
  const [selected_skills, set_selected_skills] = useState([]);
  const toggleSkill = (option) => {
    if (selected_skills.includes(option)) {
      set_selected_skills(selected_skills.filter((item) => item !== option));
    } else {
      set_selected_skills([...selected_skills, option]);
    }
  };

  const [selected_interests, set_selected_interests] = useState([]);
  const toggleInterest = (option) => {
    if (selected_interests.includes(option)) {
      set_selected_interests(
        selected_interests.filter((item) => item !== option)
      );
    } else {
      set_selected_interests([...selected_interests, option]);
    }
  };

  const [hackathon_goal, set_hackathon_goal] = useState("I want to learn new skills and meet new people.");

  const [editing, setEditing] = useState(null);

  const renderName = (editing, name) => {
    if (editing === "name") {
      return <Form.Control placeholder={`${name}`} type="text" />;
    } else {
      return <p>{name}</p>;
    }
  };

  const renderSkills = (editing) => {
    if (editing === "skills") {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          {skills.map((option) => (
            <div key={`${option}`} style={{ display: "inline-block" }}>
              <Form.Check
                type="checkbox"
                id={`skill-${option}`}
                label={`${option}`}
                checked={selected_skills.includes(option)}
                onChange={() => toggleSkill(option)}
              />
            </div>
          ))}
        </div>
      );
    } else {
      return skills
        .filter((option) => selected_skills.includes(option))
        .map((option) => (
          <Badge key={`${option}`} bg="secondary" style={{ margin: "2px" }}>
            {`${option}`}
          </Badge>
        ));
    }
  };

  const renderInterests = (editing) => {
    if (editing === "interests") {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          {interests.map((option) => (
            <div key={`${option}`} style={{ display: "inline-block" }}>
              <Form.Check
                type="checkbox"
                id={`skill-${option}`}
                label={`${option}`}
                checked={selected_interests.includes(option)}
                onChange={() => toggleInterest(option)}
              />
            </div>
          ))}
        </div>
      );
    } else {
      return interests
        .filter((option) => selected_interests.includes(option))
        .map((option) => (
          <Badge key={`${option}`} bg="secondary" style={{ margin: "2px" }}>
            {`${option}`}
          </Badge>
        ));
    }
  };

  const renderHackathonPurpose = (editing) => {
    if (editing === "hackathon goal") {
      return (
        <Form.Control
          as="textarea"
          placeholder="What do you want to get out of this hackathon?"
          style={{ height: "100px" }}
          value={hackathon_goal}
          onChange={(e) => set_hackathon_goal(e.target.value)}
        />
      );
    } else {
      return (
        <p>
          {`${hackathon_goal}`}
        </p>
      );
    }
  };

  const editButton = (editing, field) => {
    if (editing === field) {
      return (
        <Button variant="primary" onClick={() => setEditing(null)}>
          Save
        </Button>
      );
    } else {
      return (
        <Button variant="secondary" onClick={() => setEditing(field)}>
          Edit
        </Button>
      );
    }
  };

  return (
    <Authenticator loginMechanism={["email"]}>
      {({ signOut, user }) => (
        <div>
          <SiteNav logOut={signOut} />
          <h1>{user.username}'s profile</h1>
          <Form
            style={{
              margin: "10px",
            }}
          >
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label
                style={{
                  textAlign: "center",
                  marginBottom: "10px",
                  fontSize: "2em",
                }}
              >
                Name
                {editButton(editing, "name")}
              </Form.Label>
              <div
                style={{
                  margin: "10px",
                }}
              >
                {renderName(editing, user.username)}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupSkills">
              <Form.Label
                style={{
                  textAlign: "center",
                  marginBottom: "10px",
                  fontSize: "2em",
                }}
              >
                Skills
                {editButton(editing, "skills")}
              </Form.Label>
              <div
                style={{
                  margin: "10px",
                }}
              >
                {renderSkills(editing)}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupInterests">
              <Form.Label
                style={{
                  textAlign: "center",
                  marginBottom: "10px",
                  fontSize: "2em",
                }}
              >
                Interests
                {editButton(editing, "interests")}
              </Form.Label>
              <div
                style={{
                  margin: "10px",
                }}
              >
                {renderInterests(editing)}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupHackathon">
              <Form.Label
                style={{
                  textAlign: "center",
                  marginBottom: "10px",
                  fontSize: "2em",
                }}
              >
                What do you want to get out of this hackathon?
                {editButton(editing, "hackathon goal")}
              </Form.Label>
              <div
                style={{
                  margin: "10px",
                }}
              >
                {renderHackathonPurpose(editing)}
              </div>
            </Form.Group>
          </Form>
          <SiteFooter />
        </div>
      )}
    </Authenticator>
  );
}
