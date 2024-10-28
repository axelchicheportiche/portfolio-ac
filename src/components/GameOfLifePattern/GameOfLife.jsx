import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const GameOfLife = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let grid;
      let cols;
      let rows;
      let resolution = 4; // Taille d'une cellule
      let liveCellsCount = 0; // Compteur de cellules vivantes

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight); // Adapter la taille du canvas à la fenêtre
        p.frameRate(12);
        cols = Math.floor(p.width / resolution); // Calculer le nombre de colonnes
        rows = Math.floor(p.height / resolution); // Calculer le nombre de lignes

        // Initialiser la grille
        grid = make2DArray(cols, rows);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            grid[i][j] = p.random() < 0.1 ? 1 : 0;  // Remplir aléatoirement les cellules
          }
        }
      };

      p.draw = () => {
        p.background(0);
        liveCellsCount = 0; // Réinitialiser le compteur à chaque frame

        // Palette de couleurs de l'arc-en-ciel
        const rainbowColors = [
          p.color(255, 0, 0),      // Rouge
          p.color(255, 127, 0),    // Orange
          p.color(255, 255, 0),    // Jaune
          p.color(0, 255, 0),      // Vert
          p.color(0, 0, 255),      // Bleu
          p.color(75, 0, 130),     // Indigo
          p.color(148, 0, 211),    // Violet
        ];

        // Dessiner la grille et compter les cellules vivantes
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] === 1) {
              // Choisir une couleur aléatoire dans la palette arc-en-ciel
              p.fill(rainbowColors[Math.floor(p.random(rainbowColors.length))]);
              p.stroke(0);
              p.rect(x, y, resolution, resolution); // Dessiner un carré
              liveCellsCount++; // Incrémenter le compteur pour chaque cellule vivante
            }
          }
        }

        let next = make2DArray(cols, rows);

        // Calculer la prochaine génération
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            // Compter les cellules vivantes voisines
            let neighbors = countNeighbors(grid, i, j);

            // Appliquer les règles du jeu
            if (state === 0 && neighbors === 3) {
              next[i][j] = 1; // Naissance
            } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
              next[i][j] = 0; // Mort
            } else {
              next[i][j] = state; // Sinon, l'état reste le même
            }
          }
        }

        // Mettre à jour la grille
        grid = next;

        // Afficher le compteur de cellules vivantes en bas à droite
        p.fill(255);
        p.textSize(16);
        p.textAlign(p.RIGHT, p.BOTTOM);
        p.text(`Cellules vivantes: ${liveCellsCount}`, p.width - 20, p.height - 20);
      };

      // Ajuster la taille du canvas lors du redimensionnement de la fenêtre
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight); // Redimensionner le canvas
        cols = Math.floor(p.width / resolution); // Recalculer le nombre de colonnes
        rows = Math.floor(p.height / resolution); // Recalculer le nombre de lignes

        // Réinitialiser la grille après redimensionnement
        grid = make2DArray(cols, rows);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            grid[i][j] = p.floor(p.random(2)); // Remplir aléatoirement les cellules
          }
        }
      };

      // Fonction pour créer un tableau 2D
      function make2DArray(cols, rows) {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++) {
          arr[i] = new Array(rows);
        }
        return arr;
      }

      // Compter les voisins vivants
      function countNeighbors(grid, x, y) {
        let sum = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            let col = (x + i + cols) % cols; // Bord en torus (continuité)
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
          }
        }
        sum -= grid[x][y]; // Enlever l'état de la cellule actuelle
        return sum;
      }
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove(); // Nettoyer l'instance de P5 à la fin
    };
  }, []);

  return <div className='game-of-life' ref={sketchRef}></div>;
};

export default GameOfLife;