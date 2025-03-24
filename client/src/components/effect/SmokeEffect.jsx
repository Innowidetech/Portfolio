import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SmokeEffect = () => {
  const smokeRef = useRef(null);
  const cursorRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const particlesRef = useRef([]);
  const requestRef = useRef();
  const isMovingRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const particles = [];
    const particleCount = 20; // Increased particle count for a denser effect
    const colors = ['#FFFFFF'];
    const container = smokeRef.current;

    // Create smoke particles
    const createParticle = (x, y) => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-32 h-32 rounded-full pointer-events-none'; // Larger size and blur
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      container.appendChild(particle);

      particles.push({
        element: particle,
        x: x, // Initial position based on mouse
        y: y,
        vx: (Math.random() - 0.5) * 2, // Velocity for fluid motion
        vy: (Math.random() - 0.5) * 2,
        life: Math.random() * 2 + 1.5, // Life duration
        maxLife: Math.random() * 2 + 1.5, // Random max life
        scale: Math.random() * 1.5 + 1 // Random scale
      });
    };

    const animate = () => {
      if (!isMovingRef.current) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      particles.forEach((particle, index) => {
        // Gradually reduce particle life
        particle.life -= 0.006;

        if (particle.life <= 0) {
          // Reset particle to cursor position and give it new properties
          particles.splice(index, 1); // Remove dead particle
          createParticle(cursorRef.current.x, cursorRef.current.y); // Create new particle
        }

        // Update particle position with a slight fluid-like motion
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply fluid-like wobble effect (for smooth motion)
        const wobble = Math.sin(Date.now() * 0.005 + particle.maxLife) * 2;

        // GSAP to handle animation with easing for smooth movement
        gsap.set(particle.element, {
          x: particle.x + wobble,
          y: particle.y,
          opacity: (particle.life / particle.maxLife) * 0.8, // Fade out over time
          scale: particle.scale * (1 + (1 - particle.life / particle.maxLife) * 0.5), // Scale over time
          rotation: particle.life * 180, // Rotate particle for more fluid effect
          ease: 'power2.inOut'
        });
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      cursorRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };

      // Set moving state to true and reset timeout
      isMovingRef.current = true;
      clearTimeout(timeoutRef.current);

      // Create new particles based on the mouse movement
      createParticle(cursorRef.current.x, cursorRef.current.y);

      // Set timeout to stop particles after mouse stops moving for 2 seconds
      timeoutRef.current = setTimeout(() => {
        isMovingRef.current = false;
      }, 1000); // Adjusted to 2 seconds
    };

    document.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
      clearTimeout(timeoutRef.current);
      particles.forEach(particle => particle.element.remove());
    };
  }, []);

  return (
    <div 
      ref={smokeRef} 
      className="fixed inset-0 pointer-events-none z-20"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SmokeEffect;
