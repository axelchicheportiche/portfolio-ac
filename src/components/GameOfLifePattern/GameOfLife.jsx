import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const GameOfLife = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let grid;
      let cols;
      let rows;
      let resolution = 4;
      let liveCellsCount = 0;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(12);
        cols = Math.floor(p.width / resolution);
        rows = Math.floor(p.height / resolution);

        // Initialisation de la grille avec cellules aléatoires
        grid = make2DArray(cols, rows);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            grid[i][j] = p.random() < 0.1 ? 1 : 0;
          }
        }
      };

      p.draw = () => {
        p.background(0);
        liveCellsCount = 0;

        // Grille + coloration des cellules vivantes
        const rainbowColors = [
          p.color(255, 0, 0),
          p.color(255, 127, 0),
          p.color(255, 255, 0),
          p.color(0, 255, 0),
          p.color(0, 0, 255),
          p.color(75, 0, 130),
          p.color(148, 0, 211),
        ];

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (grid[i][j] === 1) {
              p.fill(rainbowColors[Math.floor(p.random(rainbowColors.length))]);
              p.stroke(0);
              p.rect(i * resolution, j * resolution, resolution, resolution);
              liveCellsCount++;
            }
          }
        }

        let next = make2DArray(cols, rows);

        // Règles du jeu de la vie 
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            let neighbors = countNeighbors(grid, i, j);

            if (state === 0 && neighbors === 3) {
              next[i][j] = 1;
            } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
              next[i][j] = 0;
            } else {
              next[i][j] = state;
            }
          }
        }

        grid = next;

        // Compteur de cellules vivantes en bas à droite
        p.fill(255);
        p.textSize(16);
        p.textAlign(p.RIGHT, p.BOTTOM);
        p.text(`Living cells: ${liveCellsCount}`, p.width - 20, p.height - 20);
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        cols = Math.floor(p.width / resolution);
        rows = Math.floor(p.height / resolution);

        grid = make2DArray(cols, rows);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            grid[i][j] = p.floor(p.random(2));
          }
        }
      };

      // Création tableau bidimensionnel
      function make2DArray(cols, rows) {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++) {
          arr[i] = new Array(rows);
        }
        return arr;
      }

      // Compteur de voisins vivants autour d'une cellule donnée
      function countNeighbors(grid, x, y) {
        let sum = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
          }
        }
        sum -= grid[x][y];
        return sum;
      }
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div className='game-of-life' ref={sketchRef}> 
  <span style={{ display: 'none' }}>Hi there ! this is the Game of Life, a cellular automaton devised by the mathematician John Conway. 
  It simulates the birth and death of cells based on simple rules, creating complex patterns over time. Thanks for taking a look! – Axel </span>
    </div>;
};

export default GameOfLife;