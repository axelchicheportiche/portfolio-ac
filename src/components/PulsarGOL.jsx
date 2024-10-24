import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Component = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let grid;
      let cols;
      let rows;
      let resolution = 10; // Taille d'une cellule

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight); // Adapter la taille du canvas à la fenêtre
        p.frameRate(10); // Fixer la vitesse d'exécution à 10 FPS
        cols = Math.floor(p.width / resolution);
        rows = Math.floor(p.height / resolution);

        // Initialiser une grille vide
        grid = make2DArray(cols, rows);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            grid[i][j] = 0; // Commencer avec toutes les cellules mortes
          }
        }

        // Ajouter un oscillateur "Pulsar" au centre de la grille
        let midX = Math.floor(cols / 2);
        let midY = Math.floor(rows / 2);

        // Motif "Pulsar" (forme rare d'oscillateur avec période 3)
        let pulsarPattern = [
          [midX - 6, midY - 4], [midX - 6, midY - 3], [midX - 6, midY - 2],
          [midX - 4, midY - 6], [midX - 3, midY - 6], [midX - 2, midY - 6],
          [midX - 1, midY - 4], [midX - 1, midY - 3], [midX - 1, midY - 2],
          [midX - 4, midY - 1], [midX - 3, midY - 1], [midX - 2, midY - 1],

          [midX - 6, midY + 2], [midX - 6, midY + 3], [midX - 6, midY + 4],
          [midX - 4, midY + 6], [midX - 3, midY + 6], [midX - 2, midY + 6],
          [midX - 1, midY + 2], [midX - 1, midY + 3], [midX - 1, midY + 4],
          [midX - 4, midY + 1], [midX - 3, midY + 1], [midX - 2, midY + 1],

          [midX + 1, midY - 4], [midX + 1, midY - 3], [midX + 1, midY - 2],
          [midX + 2, midY - 6], [midX + 3, midY - 6], [midX + 4, midY - 6],
          [midX + 6, midY - 4], [midX + 6, midY - 3], [midX + 6, midY - 2],
          [midX + 2, midY - 1], [midX + 3, midY - 1], [midX + 4, midY - 1],

          [midX + 1, midY + 2], [midX + 1, midY + 3], [midX + 1, midY + 4],
          [midX + 2, midY + 6], [midX + 3, midY + 6], [midX + 4, midY + 6],
          [midX + 6, midY + 2], [midX + 6, midY + 3], [midX + 6, midY + 4],
          [midX + 2, midY + 1], [midX + 3, midY + 1], [midX + 4, midY + 1]
        ];

        // Placer les cellules vivantes pour le Pulsar
        pulsarPattern.forEach(([x, y]) => {
          grid[x][y] = 1;
        });

      };

      p.draw = () => {
        p.background(0); // Fond noir

        // Dessiner la grille
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] === 1) {
              p.fill(255); // Cellule vivante (blanche)
              p.stroke(0);
              p.rect(x, y, resolution, resolution); // Dessiner un carré
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
      };

      // Ajuster la taille du canvas lors du redimensionnement de la fenêtre
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight); // Redimensionner le canvas
        cols = Math.floor(p.width / resolution);
        rows = Math.floor(p.height / resolution);

        // Réinitialiser la grille après redimensionnement
        grid = make2DArray(cols, rows);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            grid[i][j] = 0; // Commencer avec toutes les cellules mortes
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

  return <div ref={sketchRef}></div>;
};

export default P5Component;