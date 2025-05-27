import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  color: string;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      }
    };

    const initParticles = () => {
      particles.current = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.05), 100);
      const colors = ['#4F46E5', '#EC4899', '#8B5CF6', '#3B82F6'];

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 200,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          speedZ: Math.random() * 0.5 - 0.25,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle) => {
        // Calculate 3D perspective
        const perspective = 300;
        const scale = perspective / (perspective + particle.z);
        const x2d = particle.x * scale;
        const y2d = particle.y * scale;

        // Add parallax effect based on mouse position
        const mouseX = mousePosition.current.x - canvas.width / 2;
        const mouseY = mousePosition.current.y - canvas.height / 2;
        const parallaxX = (mouseX - x2d) * 0.05;
        const parallaxY = (mouseY - y2d) * 0.05;

        ctx.fillStyle = particle.color;
        ctx.globalAlpha = Math.min(1, scale * 1.5);
        ctx.beginPath();
        ctx.arc(
          x2d + parallaxX + canvas.width / 2,
          y2d + parallaxY + canvas.height / 2,
          particle.size * scale,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Update particle position with 3D movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.z += particle.speedZ;

        // Boundary checks with smooth wrapping
        if (particle.x < -100) particle.x = canvas.width + 100;
        if (particle.x > canvas.width + 100) particle.x = -100;
        if (particle.y < -100) particle.y = canvas.height + 100;
        if (particle.y > canvas.height + 100) particle.y = -100;
        if (particle.z < 0) particle.z = 200;
        if (particle.z > 200) particle.z = 0;

        // Draw connections between nearby particles
        particles.current.forEach((otherParticle) => {
          const dx = x2d - otherParticle.x * scale;
          const dy = y2d - otherParticle.y * scale;
          const dz = particle.z - otherParticle.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (distance < 100) {
            ctx.strokeStyle = `rgba(79, 70, 229, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5 * scale;
            ctx.beginPath();
            ctx.moveTo(x2d + parallaxX + canvas.width / 2, y2d + parallaxY + canvas.height / 2);
            ctx.lineTo(
              otherParticle.x * scale + parallaxX + canvas.width / 2,
              otherParticle.y * scale + parallaxY + canvas.height / 2
            );
            ctx.stroke();
          }
        });
      });

      animationFrameId.current = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
};

export default ParticleBackground;