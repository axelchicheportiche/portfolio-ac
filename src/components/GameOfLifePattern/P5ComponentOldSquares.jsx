import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Component = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = new p5(p => {
      const squares = [];
      const squareSize = 20;
      const spacing = 30;
      const fadeDuration = 500;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        for (let x = spacing / 2; x < p.width; x += spacing) {
          for (let y = spacing / 2; y < p.height; y += spacing) {
            squares.push({ x, y, colorValue: 255, lastHovered: null });
          }
        }
      };

      p.draw = () => {
        p.background(0);

        squares.forEach(square => {
          const d = p.dist(p.mouseX, p.mouseY, square.x, square.y);

          if (d < squareSize / 2) {
            square.colorValue = 0;
            square.lastHovered = p.millis();
          } else if (square.lastHovered) {
            const timeSinceHovered = p.millis() - square.lastHovered;

            if (timeSinceHovered < fadeDuration) {
              const progress = timeSinceHovered / fadeDuration;
              square.colorValue = p.lerp(0, 255, progress);
            } else {
              square.colorValue = 255;
            }
          }

          p.fill(square.colorValue);
          p.noStroke();
          p.rect(square.x - squareSize / 2, square.y - squareSize / 2, squareSize, squareSize);
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.redraw();
      };
    }, sketchRef.current);

    return () => {
      sketch.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default P5Component;