import { useEffect, useRef } from "react";
import * as anime from "animejs";

declare global {
  interface Window {
    THREE: any;
  }
}

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const meshRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const particleSystemRef = useRef<any>(null);

  useEffect(() => {
    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      if (!mountRef.current || !window.THREE) return;

      const THREE = window.THREE;
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);
      
      // Store references
      sceneRef.current = scene;
      rendererRef.current = renderer;
      cameraRef.current = camera;
      
      // Create morphing geometry
      const sphereGeometry = new THREE.SphereGeometry(8, 32, 32);
      const torusGeometry = new THREE.TorusGeometry(6, 2, 16, 100);
      const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
      const octahedronGeometry = new THREE.OctahedronGeometry(8);
      
      // Create material with neon glow effect
      const material = new THREE.MeshBasicMaterial({
        color: 0x80ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      
      // Start with sphere
      const mesh = new THREE.Mesh(sphereGeometry, material);
      mesh.position.set(0, 0, 0);
      scene.add(mesh);
      meshRef.current = mesh;
      
      // Create enhanced particle system
      const particleCount = 2000;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = (Math.random() - 0.5) * 200;
        positions[i + 2] = (Math.random() - 0.5) * 200;
        
        velocities[i] = (Math.random() - 0.5) * 0.02;
        velocities[i + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i + 2] = (Math.random() - 0.5) * 0.02;
        
        // Dynamic colors based on scroll
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
      particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      
      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);
      particleSystemRef.current = particleSystem;
      
      camera.position.z = 30;
      
      // Scroll-based morphing system
      let currentGeometryIndex = 0;
      const geometries = [sphereGeometry, torusGeometry, boxGeometry, octahedronGeometry];
      const geometryNames = ['sphere', 'torus', 'box', 'octahedron'];
      
      const morphToGeometry = (targetIndex: number) => {
        if (currentGeometryIndex === targetIndex) return;
        
        const targetGeometry = geometries[targetIndex];
        const currentPositions = mesh.geometry.attributes.position.array;
        const targetPositions = targetGeometry.attributes.position.array;
        
        // Ensure arrays are the same length for morphing
        const minLength = Math.min(currentPositions.length, targetPositions.length);
        
        // Animate the geometry morphing with anime.js
        anime({
          targets: currentPositions,
          duration: 1500,
          easing: 'easeInOutQuart',
          update: function() {
            for (let i = 0; i < minLength; i++) {
              currentPositions[i] = THREE.MathUtils.lerp(
                currentPositions[i], 
                targetPositions[i], 
                0.1
              );
            }
            mesh.geometry.attributes.position.needsUpdate = true;
          },
          complete: function() {
            // Replace geometry completely after animation
            mesh.geometry.dispose();
            mesh.geometry = targetGeometry.clone();
            currentGeometryIndex = targetIndex;
          }
        });
        
        // Animate color changes
        anime({
          targets: material,
          duration: 1000,
          easing: 'easeInOutQuad',
          opacity: [0.8, 0.6, 0.8],
          update: function() {
            const colors = [0x80ff00, 0x00ff80, 0x4099ff, 0xff8000];
            material.color.setHex(colors[targetIndex]);
          }
        });
        
        // Animate scale and rotation
        anime({
          targets: mesh.scale,
          x: [1, 1.2, 1],
          y: [1, 1.2, 1],
          z: [1, 1.2, 1],
          duration: 1200,
          easing: 'easeInOutElastic(1, .8)'
        });
      };
      
      // Scroll event handler
      const handleScroll = () => {
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        const geometryIndex = Math.floor(scrollPercent * geometries.length);
        const clampedIndex = Math.min(geometryIndex, geometries.length - 1);
        
        morphToGeometry(clampedIndex);
        
        // Animate camera position based on scroll
        anime({
          targets: camera.position,
          x: Math.sin(scrollPercent * Math.PI * 2) * 10,
          y: Math.cos(scrollPercent * Math.PI * 2) * 5,
          duration: 500,
          easing: 'easeOutQuad'
        });
        
        // Animate particle system
        const particlePositions = particleSystem.geometry.attributes.position.array;
        const particleColors = particleSystem.geometry.attributes.color.array;
        
        for (let i = 0; i < particleCount * 3; i += 3) {
          // Create wave effect based on scroll
          const wave = Math.sin(scrollPercent * Math.PI * 4 + i * 0.01) * 20;
          particlePositions[i + 1] += wave * 0.01;
          
          // Change particle colors based on scroll
          const colorIntensity = 0.5 + scrollPercent * 0.5;
          particleColors[i] = colorIntensity;
          particleColors[i + 1] = 1 - scrollPercent * 0.3;
          particleColors[i + 2] = scrollPercent;
        }
        
        particleSystem.geometry.attributes.position.needsUpdate = true;
        particleSystem.geometry.attributes.color.needsUpdate = true;
      };
      
      // Throttled scroll handler for performance
      let scrollTimeout: number;
      const throttledScroll = () => {
        if (scrollTimeout) return;
        scrollTimeout = requestAnimationFrame(() => {
          handleScroll();
          scrollTimeout = 0;
        });
      };
      
      window.addEventListener('scroll', throttledScroll);
      
      // Animation loop with enhanced effects
      let animationId: number;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        
        if (meshRef.current) {
          // Continuous rotation with anime.js influence
          meshRef.current.rotation.x += 0.005;
          meshRef.current.rotation.y += 0.01;
          
          // Breathing effect
          const breathe = Math.sin(Date.now() * 0.001) * 0.1 + 1;
          meshRef.current.scale.setScalar(breathe);
        }
        
        if (particleSystemRef.current) {
          // Rotate particle system
          particleSystemRef.current.rotation.x += 0.001;
          particleSystemRef.current.rotation.y += 0.002;
          
          // Update particle positions for floating effect
          const positions = particleSystemRef.current.geometry.attributes.position.array;
          const velocities = particleSystemRef.current.geometry.attributes.velocity.array;
          
          for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];
            
            // Boundary check and reset
            if (Math.abs(positions[i]) > 100) velocities[i] *= -1;
            if (Math.abs(positions[i + 1]) > 100) velocities[i + 1] *= -1;
            if (Math.abs(positions[i + 2]) > 100) velocities[i + 2] *= -1;
          }
          
          particleSystemRef.current.geometry.attributes.position.needsUpdate = true;
        }
        
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
      
      // Initial animation entrance
      anime({
        targets: mesh.scale,
        x: [0, 1],
        y: [0, 1], 
        z: [0, 1],
        duration: 2000,
        easing: 'easeOutElastic(1, .8)',
        delay: 500
      });
      
      anime({
        targets: mesh.rotation,
        y: [0, Math.PI * 2],
        duration: 3000,
        easing: 'easeInOutQuad'
      });
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', throttledScroll);
        cancelAnimationFrame(animationId);
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        // Dispose of Three.js resources
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) mesh.material.dispose();
        if (particleSystem.geometry) particleSystem.geometry.dispose();
        if (particleSystem.material) particleSystem.material.dispose();
        renderer.dispose();
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