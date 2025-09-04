import { useEffect, useState } from "react";
import * as anime from "animejs";

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentShape, setCurrentShape] = useState("Sphere");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(scrollPercent);
      
      // Determine current shape based on scroll
      const shapes = ["Sphere", "Torus", "Cube", "Octahedron"];
      const shapeIndex = Math.floor(scrollPercent * shapes.length);
      const clampedIndex = Math.min(shapeIndex, shapes.length - 1);
      setCurrentShape(shapes[clampedIndex]);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate the progress bar
    anime({
      targets: '.scroll-progress-bar',
      width: `${scrollProgress * 100}%`,
      duration: 300,
      easing: 'easeOutQuad'
    });
  }, [scrollProgress]);

  return (
    <div className="fixed top-20 right-6 z-50 glass-card rounded-lg p-4 border-primary-green">
      <div className="text-sm text-primary-green font-semibold mb-2">
        3D Model: {currentShape}
      </div>
      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="scroll-progress-bar h-full bg-gradient-to-r from-primary-green to-accent-blue rounded-full"
          style={{ width: '0%' }}
        />
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        Scroll to morph
      </div>
    </div>
  );
}