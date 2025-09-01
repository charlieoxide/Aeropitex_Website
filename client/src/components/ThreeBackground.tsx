import { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE: any;
  }
}

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      if (!mountRef.current || !window.THREE) return;

      const THREE = window.THREE;
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);
      
      // Create particle system
      const particleCount = 1000;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;
        
        // Modern tech colors
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
          colors[i] = 0.5; colors[i + 1] = 1; colors[i + 2] = 0; // Primary Green
        } else if (colorChoice < 0.66) {
          colors[i] = 0; colors[i + 1] = 1; colors[i + 2] = 0.5; // Secondary Green
        } else {
          colors[i] = 0.25; colors[i + 1] = 0.6; colors[i + 2] = 1; // Accent Blue
        }
      }
      
      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
      });
      
      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);
      
      // Create wireframe geometric shapes
      const geometries = [
        new THREE.TetrahedronGeometry(5),
        new THREE.OctahedronGeometry(4),
        new THREE.IcosahedronGeometry(3)
      ];
      
      const wireframeMaterials = [
        new THREE.MeshBasicMaterial({color: 0x80ff00, wireframe: true, transparent: true, opacity: 0.3}),
        new THREE.MeshBasicMaterial({color: 0x00ff80, wireframe: true, transparent: true, opacity: 0.3}),
        new THREE.MeshBasicMaterial({color: 0x4099ff, wireframe: true, transparent: true, opacity: 0.3})
      ];
      
      const meshes: any[] = [];
      for (let i = 0; i < 3; i++) {
        const mesh = new THREE.Mesh(geometries[i], wireframeMaterials[i]);
        mesh.position.set(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50
        );
        meshes.push(mesh);
        scene.add(mesh);
      }
      
      camera.position.z = 30;
      
      // Animation loop
      let animationId: number;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        
        // Rotate particle system
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.002;
        
        // Rotate wireframe meshes
        meshes.forEach((mesh, index) => {
          mesh.rotation.x += 0.01 * (index + 1);
          mesh.rotation.y += 0.01 * (index + 1);
        });
        
        renderer.render(scene, camera);
      };
      animate();
      
      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    };
    
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
