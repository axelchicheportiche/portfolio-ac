import React from "react";
import './Homepage.css';
import P5Component from "../components/GameOfLifePattern/P5Component";
import Name from "../components/Name/Name";
import PulsarGOL from "../components/GameOfLifePattern/PulsarGOL"; 
import GameOfLife from "../components/GameOfLifePattern/GameOfLife"; 
import About from "../components/About/About";
import Experience from "../components/Experience/Experience";
import Projects from "../components/Projects/Projects";
import Skills from "../components/Skills/Skills";
import Contact from "../components/Contact/Contact";

const HomePage = () => {
    return (
        <div className="homepage">
            <div></div>
            <GameOfLife />
            <Name />
            <div className="empty"></div>
            <div className="container-g">
            <About />
            <Experience />
            <Projects />
            <Skills/>
            <Contact/>
            </div>
        </div>
    );
};

export default HomePage; 