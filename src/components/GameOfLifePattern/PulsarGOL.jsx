import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Component = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let grid;
      let cols;
      let rows;
      let resolution = 10;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(10);
        cols = Math.floor(p.width / resolution);
        rows = Math.floor(p.height / resolution);

        grid = make2DArray(cols, rows);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
          }
        }

        let midX = Math.floor(cols / 2);
        let midY = Math.floor(rows / 2);

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
          grid[x][y] = 1;
        });
      };

      p.draw = () => {
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

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        cols = Math.floor(p.width / resolution);
        rows = Math.floor(p.height / resolution);

        grid = make2DArray(cols, rows);
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
          }
        }
      };

      function make2DArray(cols, rows) {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++) {
          arr[i] = new Array(rows);
        }
        return arr;
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
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default P5Component;