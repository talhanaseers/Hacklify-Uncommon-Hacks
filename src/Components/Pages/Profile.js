import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import SiteNav from "../Common/SiteNav";
import SiteFooter from "../Common/SiteFooter";

import { React, useState } from "react";
import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../../aws-exports";
import { deleteUser } from "aws-amplify/auth";

Amplify.configure(awsExports);

async function deleteAccount() {
  try {
    await deleteUser();
  } catch (error) {
    console.log(error);
  }
}

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

  const [hackathon_goal, set_hackathon_goal] = useState(
    "I want to learn new skills and meet new people."
  );

  const [editing, setEditing] = useState(null);

  const renderName = (name) => {
    if (editing) {
      return <Form.Control placeholder={`${name}`} type="text" />;
    } else {
      return <p>{name}</p>;
    }
  };

  const renderSkills = () => {
    if (editing) {
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
          <Badge
            pill
            key={`${option}`}
            bg="secondary"
            style={{ margin: "2px" }}
          >
            {`${option}`}
          </Badge>
        ));
    }
  };

  const renderInterests = () => {
    if (editing) {
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
          <Badge
            pill
            key={`${option}`}
            bg="secondary"
            style={{ margin: "2px" }}
          >
            {`${option}`}
          </Badge>
        ));
    }
  };

  const renderHackathonPurpose = () => {
    if (editing) {
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
      return <p>{`${hackathon_goal}`}</p>;
    }
  };

  const editButton = () => {
    if (editing) {
      return (
        <button
          style={{ margin: "10px" }}
          onClick={() => setEditing(false)}
          className="unstyled"
        >
          &#10003; Save
        </button>
      );
    } else {
      return (
        <button onClick={() => setEditing(true)} className="unstyled">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
        </button>
      );
    }
  };

  return (
    <Authenticator loginMechanism={["email"]}>
      {({ signOut, user }) => (
        <>
          <SiteNav logOut={signOut} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                margin: "10px",
              }}
            >
              <Image src="/img/profile.svg" width="25%" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                margin: "10px",
              }}
            >
              <h1>{user.username}'s profile</h1>
              {editButton()}
            </div>
            <div>
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
                      width: "100%",
                    }}
                  >
                    Name
                  </Form.Label>
                  <div
                    style={{
                      margin: "10px",
                      textAlign: "center",
                    }}
                  >
                    {renderName(user.username)}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupSkills">
                  <Form.Label
                    style={{
                      textAlign: "center",
                      marginBottom: "10px",
                      fontSize: "2em",
                      width: "100%",
                    }}
                  >
                    Skills
                  </Form.Label>
                  <div
                    style={{
                      margin: "10px",
                    }}
                  >
                    {renderSkills()}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupInterests">
                  <Form.Label
                    style={{
                      textAlign: "center",
                      marginBottom: "10px",
                      fontSize: "2em",
                      width: "100%",
                    }}
                  >
                    Interests
                  </Form.Label>
                  <div
                    style={{
                      margin: "10px",
                    }}
                  >
                    {renderInterests()}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupHackathon">
                  <Form.Label
                    style={{
                      textAlign: "center",
                      marginBottom: "10px",
                      fontSize: "2em",
                      width: "100%",
                    }}
                  >
                    {editing
                      ? "What do you want to get out of this hackathon?"
                      : "Hackathon Goal"}
                  </Form.Label>
                  <div
                    style={{
                      margin: "10px",
                      textAlign: "center",
                    }}
                  >
                    {renderHackathonPurpose()}
                  </div>
                </Form.Group>
                {editing && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteAccount();
                      }}
                    >
                      Delete Account
                    </Button>
                  </div>
                )}
              </Form>
            </div>
          </div>
          <SiteFooter />
        </>
      )}
    </Authenticator>
  );
}
