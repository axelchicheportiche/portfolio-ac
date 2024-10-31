import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Component = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let grid;
      let cols;
      let rows;
      let resolution = 8;
      let gameStarted = false;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(20);
        cols = Math.floor(p.width / resolution);
        rows = Math.floor(p.height / resolution);

        grid = make2DArray(cols, rows);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
          }
        }

        createSimpleGliderGun(20, 20);
        createRightGliderGun(cols - 40, 20);
        drawGrid(p, grid, cols, rows, resolution);

        setTimeout(() => {
          gameStarted = true;
        }, 500);
      };

      p.draw = () => {
        if (!gameStarted) return;

        p.background(0);

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] === 1) {
              p.fill(255);
              p.stroke(0);
              p.rect(x, y, resolution, resolution);
            }
          }
        }

        let next = make2DArray(cols, rows);

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
      };

      function make2DArray(cols, rows) {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++) {
          arr[i] = new Array(rows).fill(0);
        }
        return arr;
      }

      function drawGrid(p, grid, cols, rows, resolution) {
        p.background(0);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] === 1) {
              p.fill(200);
              p.stroke(0);
              p.rect(x, y, resolution, resolution);
            }
          }
        }
      }

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

      function createSimpleGliderGun(midX, midY) {
        const gunPattern = [
          [midX, midY + 4], [midX, midY + 5], [midX + 1, midY + 4], [midX + 1, midY + 5],
          [midX + 10, midY + 4], [midX + 10, midY + 5], [midX + 10, midY + 6],
          [midX + 11, midY + 3], [midX + 11, midY + 7], [midX + 12, midY + 2],
          [midX + 12, midY + 8], [midX + 13, midY + 2], [midX + 13, midY + 8],
          [midX + 14, midY + 5], [midX + 15, midY + 3], [midX + 15, midY + 7],
          [midX + 16, midY + 4], [midX + 16, midY + 5], [midX + 16, midY + 6],
          [midX + 17, midY + 5],
          [midX + 20, midY + 2], [midX + 20, midY + 3], [midX + 20, midY + 4],
          [midX + 21, midY + 2], [midX + 21, midY + 3], [midX + 21, midY + 4],
          [midX + 22, midY + 1], [midX + 22, midY + 5],
          [midX + 24, midY], [midX + 24, midY + 1], [midX + 24, midY + 5], [midX + 24, midY + 6],
          [midX + 34, midY + 2], [midX + 34, midY + 3], [midX + 35, midY + 2], [midX + 35, midY + 3]
        ];
        gunPattern.forEach(([i, j]) => {
          if (i >= 0 && i < cols && j >= 0 && j < rows) {
            grid[i][j] = 1;
          }
        });
      }

      function createRightGliderGun(midX, midY) {
        const gunPattern = [
          [midX, midY + 4], [midX, midY + 5], [midX - 1, midY + 4], [midX - 1, midY + 5],
          [midX - 10, midY + 4], [midX - 10, midY + 5], [midX - 10, midY + 6],
          [midX - 11, midY + 3], [midX - 11, midY + 7], [midX - 12, midY + 2],
          [midX - 12, midY + 8], [midX - 13, midY + 2], [midX - 13, midY + 8],
          [midX - 14, midY + 5], [midX - 15, midY + 3], [midX - 15, midY + 7],
          [midX - 16, midY + 4], [midX - 16, midY + 5], [midX - 16, midY + 6],
          [midX - 17, midY + 5],
          [midX - 20, midY + 2], [midX - 20, midY + 3], [midX - 20, midY + 4],
          [midX - 21, midY + 2], [midX - 21, midY + 3], [midX - 21, midY + 4],
          [midX - 22, midY + 1], [midX - 22, midY + 5],
          [midX - 24, midY], [midX - 24, midY + 1], [midX - 24, midY + 5], [midX - 24, midY + 6],
          [midX - 34, midY + 2], [midX - 34, midY + 3], [midX - 35, midY + 2], [midX - 35, midY + 3]
        ];
        gunPattern.forEach(([i, j]) => {
          if (i >= 0 && i < cols && j >= 0 && j < rows) {
            grid[i][j] = 1;
          }
        });
      }
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default P5Component;