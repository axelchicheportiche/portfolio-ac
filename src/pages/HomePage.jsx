import React from "react";
import './Homepage.css';
import P5Component from "../components/P5Component";
import Name from "../components/Name/Name";
import PulsarGOL from "../components/PulsarGOL"; 
import GameOfLife from "../components/GameOfLife"; 

const HomePage = () => {
    return (
        <div className="homepage">
            <P5Component />
            <Name />
            <h1>Boilerplate Axel</h1> 
            <p>react + vite + react-router + P5.js</p>
            <p>(clean the CSS part)</p>
        </div>
    );
};

export default HomePage; 