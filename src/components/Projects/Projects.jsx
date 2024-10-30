import React from "react";
import "./Projects.css";

const Projects = () => {
  return (
    <div className="projects">
      <h1>Projects</h1>
      <div className="projects-content">
        {data.map((item, i) => (
          <div className="item" key={i}>
            <div className="project-box">
              <div className="prj-name">{item.name}</div>
              <div className="prj-description">
                <div>{item.description}</div>
              </div>
              <div className="prj-stack">
                <div>{item.stack}</div>
              </div>
              {item.buttonLink && (
                <a
                  href={item.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="linkButton">Website</div>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const data = [
  {
    name: "Battleground",
    description:
      "(Project in progress in collaboration with two senior developers) SaaS designed for CrossFit competition organizers and athletes, facilitating the management of sports events.",
    stack: "Golang - HTMX - Tailwind - PostgreSQL - Docker - AWS",
    buttonLink: null,
  },
  {
    name: "luud-discs.fr",
    description:
      "Website development with React and Vite, integrating access to main platforms and a complete discography. Mockup created on Figma to reinforce the label’s identity.",
    stack: "React - Vite - React Router - Figma - Ionos",
    buttonLink: "http://luud-discs.fr",
  },
  {
    name: "randomtrackid",
    description:
      "With each login, RandomTrackID returns a music track from my Rekordbox software and allows a search on YouTube.",
    stack: "Vanilla JS - HTML+CSS Node.js - Express - API REST - Vercel",
    buttonLink: "https://randomtrackid.vercel.app/",
  },
  {
    name: "soulseek-tool",
    description:
      "Creation of an open-source tool for users of the vintage p2p software Soulseek. Detailed explanation in my LinkedIn article.",
    stack: "Vanilla JS - HTML+CSS  Vercel",
    buttonLink: "https://soulseek-tool.vercel.app/",
  },
  {
    name: "Adopte un meuble",
    description:
      "Développement complet d’une plateforme de vente de meubles d’occasion en équipe, de la conception à la mise en production.",
    stack: "React, CSS, Node, Express, Sequelize",
    buttonLink: "https://github.com/adatechschool/projet-plateforme-de-vente-de-meubles-adopteunmeuble",
  },
];

export default Projects;
