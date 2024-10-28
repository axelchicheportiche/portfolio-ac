import React from "react";
import './Homepage.css';
import P5Component from "../components/GameOfLifePattern/P5Component";
import Name from "../components/Name/Name";
import PulsarGOL from "../components/GameOfLifePattern/PulsarGOL"; 
import GameOfLife from "../components/GameOfLifePattern/GameOfLife"; 

const HomePage = () => {
    return (
        <div className="homepage">
            <GameOfLife />
            <Name />
            <h1>Boilerplate Axel</h1> 
            <p>react + vite + react-router + P5.js</p>
            <p>(clean the CSS part)</p>
        </div>
    );
};

export default HomePage; 