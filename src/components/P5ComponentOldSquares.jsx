import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Component = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = new p5(p => {
      const squares = [];
      const squareSize = 20;
      const spacing = 30;
      const fadeDuration = 500; // Durée de transition de 0.5 seconde

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        // Initialisation des carrés avec leurs positions et état
        for (let x = spacing / 2; x < p.width; x += spacing) {
          for (let y = spacing / 2; y < p.height; y += spacing) {
            squares.push({ x, y, colorValue: 255, lastHovered: null });
          }
        }
      };

      p.draw = () => {
        p.background(0); // Fond noir

        // Boucle pour dessiner et gérer les carrés
        squares.forEach(square => {
          // Calculer la distance entre la souris et le centre du carré
          const d = p.dist(p.mouseX, p.mouseY, square.x, square.y);

          // Si la souris est au-dessus du carré, on change sa couleur
          if (d < squareSize / 2) {
            square.colorValue = 0; // Noir
            square.lastHovered = p.millis(); // Enregistrer le moment du survol
          } else if (square.lastHovered) {
            // Calcule combien de temps s'est écoulé depuis le survol
            const timeSinceHovered = p.millis() - square.lastHovered;

            // Si moins de fadeDuration, on fait la transition vers blanc
            if (timeSinceHovered < fadeDuration) {
              const progress = timeSinceHovered / fadeDuration;
              square.colorValue = p.lerp(0, 255, progress); // Transition progressive
            } else {
              square.colorValue = 255; // Complètement blanc après la transition
            }
          }

          // Dessiner le carré avec la couleur actuelle
          p.fill(square.colorValue);
          p.noStroke();
          // Dessiner le carré à partir de son centre (ajuster avec -squareSize / 2)
          p.rect(square.x - squareSize / 2, square.y - squareSize / 2, squareSize, squareSize);
        });
      };

      // Redimensionner le canvas lorsque la fenêtre est redimensionnée
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.redraw(); // Redessiner les carrés après redimensionnement
      };
    }, sketchRef.current);

    return () => {
      sketch.remove(); // Cleanup P5 instance on component unmount
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default P5Component;