import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Component = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let grid;
      let cols;
      let rows;
      let resolution = 8; // Taille d'une cellule augmentée
      let liveCellsCount = 0; // Compteur de cellules vivantes
      let gameStarted = false; // Le jeu commence après 5 secondes

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight); // Adapter la taille du canvas à la fenêtre
        p.frameRate(11);
        cols = Math.floor(p.width / resolution); // Calculer le nombre de colonnes
        rows = Math.floor(p.height / resolution); // Calculer le nombre de lignes

        // Initialiser la grille
        grid = make2DArray(cols, rows);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            grid[i][j] = 0; // Toutes les cellules sont initialement mortes
          }
        }

        // Fonction pour générer un pulsar à partir d'une position centrale
        function createPulsar(midX, midY) {
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

          pulsarPattern.forEach(([x, y]) => {
            grid[x][y] = 1; // Activer les cellules du pulsar
          });
        }

        // Centrer les lettres "A" et "C" au milieu
        const acLetters = [
          // Lettre A (beaucoup plus grande et épaisse)
          [5, 15], [6, 14], [7, 13], [8, 12], [9, 11], [10, 10],
          [11, 9], [12, 8], [13, 8], [14, 9], [15, 10],
          [16, 11], [17, 12], [18, 13], [19, 14], [20, 15],
          [15, 14], [16, 13], [17, 12], [18, 11],
          [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], // Barre centrale du A

          // Lettre C (forme approximative en grand)
          [15, 8], [16, 7], [17, 7], [18, 7], [19, 8], [20, 9], [20, 10], [20, 11],
          [20, 12], [20, 13], [19, 14], [18, 15], [17, 15], [16, 15], [15, 14]
        ];

        // Centrer les lettres "AC"
        const centeredLetters = centerLetters(acLetters, cols, rows);
        centeredLetters.forEach(([x, y]) => {
          grid[x][y] = 1; // Activer les cellules des lettres centrées
        });

        // Placer un pulsar à gauche et un autre à droite
        let leftPulsarX = Math.floor(cols / 4); // Positionner le pulsar gauche
        let rightPulsarX = Math.floor((cols / 4) * 3); // Positionner le pulsar droite
        let pulsarY = Math.floor(rows / 2); // Centrer verticalement

        createPulsar(leftPulsarX, pulsarY); // Créer le pulsar à gauche
        createPulsar(rightPulsarX, pulsarY); // Créer le pulsar à droite

        // Afficher l'état initial sans évolution
        drawGrid(p, grid, cols, rows, resolution);

        // Démarrer le jeu après 5 secondes
        setTimeout(() => {
          gameStarted = true;
        }, 1500);
      };

      p.draw = () => {
        if (!gameStarted) {
          // Tant que le jeu n'a pas commencé, l'affichage reste statique
          return;
        }

        p.background(0);
        liveCellsCount = 0; // Réinitialiser le compteur à chaque frame

        // Dessiner la grille et compter les cellules vivantes
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] === 1) {
              p.fill(255); // Cellule vivante (blanche)
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
        p.fill(100);
        p.textSize(16);
        p.textAlign(p.RIGHT, p.BOTTOM);
        p.text(`Cellules vivantes: ${liveCellsCount}`, p.width - 20, p.height - 20);
      };

      // Fonction pour centrer les lettres
      function centerLetters(acLetters, cols, rows) {
        const letterMinX = Math.min(...acLetters.map(([x, y]) => x));
        const letterMaxX = Math.max(...acLetters.map(([x, y]) => x));
        const letterMinY = Math.min(...acLetters.map(([x, y]) => y));
        const letterMaxY = Math.max(...acLetters.map(([x, y]) => y));

        const letterWidth = letterMaxX - letterMinX;
        const letterHeight = letterMaxY - letterMinY;

        // Calculer l'offset pour centrer les lettres
        const offsetX = Math.floor((cols - letterWidth) / 2 - letterMinX);
        const offsetY = Math.floor((rows - letterHeight) / 2 - letterMinY);

        // Appliquer l'offset à chaque coordonnée
        return acLetters.map(([x, y]) => [x + offsetX, y + offsetY]);
      }

      // Fonction pour dessiner la grille statique
      function drawGrid(p, grid, cols, rows, resolution) {
        p.background(0);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] === 1) {
              p.fill(200); // Cellule vivante (blanche)
              p.stroke(0);
              p.rect(x, y, resolution, resolution); // Dessiner un carré
            }
          }
        }
      }

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

  return <div ref={sketchRef}></div>;
};

export default P5Component;