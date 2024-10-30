import React from "react";
import "./Skills.css";

const Skills = () => {
  const skills = [
    "Javascript", "TypeScript", "Python", "MySQL", "React",
    "Node.js", "HTML", "Tailwind", "CSS", "Postman",
    "P5.js", "Git", "Docker", "Figma", "Photoshop",
    "Golang", "Google Analytics"
  ];

  return (
    <div className="Skills">
      <h1>Skills</h1>
      <div className="skills-content">
        {skills.map((skill, i) => (
          <div className="item" key={i}>
            <div className="bubble-skill">{skill}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;