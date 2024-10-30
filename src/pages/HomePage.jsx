import React from "react";
import './Homepage.css';
import P5Component from "../components/GameOfLifePattern/P5Component";
import Name from "../components/Name/Name";
import PulsarGOL from "../components/GameOfLifePattern/PulsarGOL"; 
import GameOfLife from "../components/GameOfLifePattern/GameOfLife"; 
import About from "../components/About/About";
import Experience from "../components/Experience/Experience";

const HomePage = () => {
    return (
        <div className="homepage">
            <GameOfLife />
            <Name />
            <About />
            <Experience />
            <h1>Boilerplate Axel</h1> 
            <p>react + vite + react-router + P5.js</p>
            <p>(clean the CSS part)</p>
        </div>
    );
};

export default HomePage; 