import React from "react";
import "./Skills.css";

const Skills = () => {
  const skills = [
    "Javascript", 
    "React", 
    "PHP", 
    "Prestashop", 
    "TypeScript", 
    "MySQL", 
    "Node.js", 
    "HTML", 
    "CSS", 
    "Tailwind", 
    "Docker", 
    "Git", 
    "DigitalOcean", 
    "Python", 
    "Postman", 
    "Figma", 
    "Photoshop", 
    "SEO", 
    "Google Analytics", 
    "Semrush", 
    "Ansible", 
    "Golang", 
    "P5.js", 
    "Solidpepper"
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
      <div>
        <img src="https://www.codewars.com/users/rtbt.axel.c/badges/large" alt="Badge Codewars" />
      </div>
    </div>
  );
};

export default Skills;