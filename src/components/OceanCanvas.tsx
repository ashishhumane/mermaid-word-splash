import { useEffect, useRef } from 'react';

interface Fish {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: 'fish' | 'jellyfish' | 'seahorse';
  angle: number;
  phase: number;
}

interface OceanCanvasProps {
  width?: number;
  height?: number;
  className?: string;
}

export function OceanCanvas({ width = 800, height = 600, className = "" }: OceanCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const fishRef = useRef<Fish[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Initialize sea creatures
    const initializeCreatures = () => {
      fishRef.current = [];
      
      // Colorful fish colors
      const fishColors = [
        'hsl(30, 80%, 60%)', // Orange
        'hsl(260, 70%, 65%)', // Purple  
        'hsl(340, 85%, 55%)', // Pink/Coral
        'hsl(120, 60%, 50%)', // Green
        'hsl(45, 90%, 70%)', // Yellow
        'hsl(200, 80%, 60%)', // Blue
        'hsl(15, 85%, 65%)', // Red-Orange
        'hsl(280, 70%, 60%)', // Magenta
      ];
      
      // Add colorful fish (more fish, fewer other creatures)
      for (let i = 0; i < 20; i++) {
        const creature: Fish = {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 15 + 8,
          color: fishColors[Math.floor(Math.random() * fishColors.length)],
          type: 'fish',
          angle: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2
        };
        fishRef.current.push(creature);
      }
    };

    const drawFish = (ctx: CanvasRenderingContext2D, fish: Fish) => {
      ctx.save();
      ctx.translate(fish.x, fish.y);
      ctx.rotate(fish.angle);
      
      // Fish body with gradient
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, fish.size);
      gradient.addColorStop(0, fish.color);
      gradient.addColorStop(0.7, fish.color.replace(')', ', 0.8)').replace('hsl', 'hsla'));
      gradient.addColorStop(1, fish.color.replace(')', ', 0.4)').replace('hsl', 'hsla'));
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, fish.size, fish.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Fish stripes/patterns (for some fish)
      if (Math.random() > 0.6) {
        ctx.fillStyle = fish.color.replace(')', ', 0.3)').replace('hsl', 'hsla');
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.ellipse(fish.size * 0.2 * i - fish.size * 0.3, 0, fish.size * 0.1, fish.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Fish tail
      ctx.fillStyle = fish.color;
      ctx.beginPath();
      ctx.moveTo(-fish.size, 0);
      ctx.lineTo(-fish.size * 1.5, -fish.size * 0.5);
      ctx.lineTo(-fish.size * 1.2, 0);
      ctx.lineTo(-fish.size * 1.5, fish.size * 0.5);
      ctx.closePath();
      ctx.fill();
      
      // Fish fins
      ctx.fillStyle = fish.color.replace(')', ', 0.7)').replace('hsl', 'hsla');
      ctx.beginPath();
      ctx.ellipse(0, fish.size * 0.4, fish.size * 0.3, fish.size * 0.2, Math.PI * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      // Fish eye
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(fish.size * 0.3, -fish.size * 0.2, fish.size * 0.15, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(fish.size * 0.35, -fish.size * 0.2, fish.size * 0.08, 0, Math.PI * 2);
      ctx.fill();
      
      // Eye highlight
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(fish.size * 0.37, -fish.size * 0.22, fish.size * 0.03, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawJellyfish = (ctx: CanvasRenderingContext2D, jellyfish: Fish) => {
      ctx.save();
      ctx.translate(jellyfish.x, jellyfish.y);
      
      // Jellyfish bell
      ctx.fillStyle = jellyfish.color;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(0, 0, jellyfish.size, 0, Math.PI, true);
      ctx.fill();
      
      // Jellyfish tentacles
      ctx.strokeStyle = jellyfish.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.5;
      
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI - Math.PI/2;
        const tentacleLength = jellyfish.size * 2;
        const wave = Math.sin(Date.now() * 0.005 + jellyfish.phase + i) * 10;
        
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * jellyfish.size * 0.8, 0);
        ctx.quadraticCurveTo(
          Math.cos(angle) * jellyfish.size + wave,
          tentacleLength / 2,
          Math.cos(angle) * jellyfish.size * 0.5 + wave * 2,
          tentacleLength
        );
        ctx.stroke();
      }
      
      ctx.restore();
    };

    const drawSeahorse = (ctx: CanvasRenderingContext2D, seahorse: Fish) => {
      ctx.save();
      ctx.translate(seahorse.x, seahorse.y);
      ctx.rotate(seahorse.angle);
      
      // Seahorse body (S-curved)
      ctx.strokeStyle = seahorse.color;
      ctx.fillStyle = seahorse.color;
      ctx.lineWidth = seahorse.size * 0.3;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(0, -seahorse.size);
      ctx.quadraticCurveTo(seahorse.size * 0.5, -seahorse.size * 0.5, 0, 0);
      ctx.quadraticCurveTo(-seahorse.size * 0.3, seahorse.size * 0.5, 0, seahorse.size);
      ctx.stroke();
      
      // Seahorse head
      ctx.beginPath();
      ctx.arc(0, -seahorse.size * 0.8, seahorse.size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      // Dorsal fin
      const finWave = Math.sin(Date.now() * 0.01 + seahorse.phase) * 0.1;
      ctx.strokeStyle = seahorse.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const y = -seahorse.size * 0.5 + (i * seahorse.size * 0.3);
        const x = Math.sin(i + finWave) * seahorse.size * 0.2;
        ctx.moveTo(0, y);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      fishRef.current.forEach((creature) => {
        // Update position
        creature.x += creature.vx;
        creature.y += creature.vy;
        
        // Wrap around screen
        if (creature.x > width + creature.size) creature.x = -creature.size;
        if (creature.x < -creature.size) creature.x = width + creature.size;
        if (creature.y > height + creature.size) creature.y = -creature.size;
        if (creature.y < -creature.size) creature.y = height + creature.size;
        
        // Update angle based on velocity for fish
        if (creature.type === 'fish') {
          creature.angle = Math.atan2(creature.vy, creature.vx);
        }
        
        // Gentle floating motion for jellyfish and seahorses
        if (creature.type === 'jellyfish' || creature.type === 'seahorse') {
          creature.y += Math.sin(Date.now() * 0.002 + creature.phase) * 0.5;
        }
        
        // Draw creature (only fish now)
        drawFish(ctx, creature);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    initializeCreatures();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none opacity-50 -z-10 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}