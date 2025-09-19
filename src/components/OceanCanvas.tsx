import { useEffect, useRef } from 'react';

interface Fish {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: 'fish' | 'jellyfish' | 'seahorse' | 'dolphin' | 'starfish' | 'treasure' | 'seaweed';
  angle: number;
  phase: number;
  wiggle?: number;
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
      
      // Add lots of colorful fish
      for (let i = 0; i < 25; i++) {
        const creature: Fish = {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 12 + 6,
          color: fishColors[Math.floor(Math.random() * fishColors.length)],
          type: 'fish',
          angle: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2
        };
        fishRef.current.push(creature);
      }
      
      // Add dolphins
      for (let i = 0; i < 3; i++) {
        const dolphin: Fish = {
          x: Math.random() * width,
          y: Math.random() * (height * 0.7),
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 15 + 20,
          color: 'hsl(200, 60%, 70%)',
          type: 'dolphin',
          angle: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2
        };
        fishRef.current.push(dolphin);
      }
      
      // Add seahorses
      for (let i = 0; i < 4; i++) {
        const seahorse: Fish = {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 8 + 12,
          color: ['hsl(280, 70%, 60%)', 'hsl(340, 80%, 65%)', 'hsl(45, 80%, 60%)'][Math.floor(Math.random() * 3)],
          type: 'seahorse',
          angle: 0,
          phase: Math.random() * Math.PI * 2,
          wiggle: Math.random() * 0.02 + 0.01
        };
        fishRef.current.push(seahorse);
      }
      
      // Add jellyfish
      for (let i = 0; i < 5; i++) {
        const jellyfish: Fish = {
          x: Math.random() * width,
          y: Math.random() * (height * 0.8),
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 10 + 8,
          color: ['hsl(300, 70%, 70%)', 'hsl(200, 80%, 70%)', 'hsl(60, 70%, 75%)'][Math.floor(Math.random() * 3)],
          type: 'jellyfish',
          angle: 0,
          phase: Math.random() * Math.PI * 2
        };
        fishRef.current.push(jellyfish);
      }
      
      // Add starfish (stationary)
      for (let i = 0; i < 6; i++) {
        const starfish: Fish = {
          x: Math.random() * width,
          y: height - Math.random() * 60 - 20,
          vx: 0,
          vy: 0,
          size: Math.random() * 8 + 10,
          color: ['hsl(30, 80%, 60%)', 'hsl(340, 85%, 65%)', 'hsl(260, 70%, 70%)'][Math.floor(Math.random() * 3)],
          type: 'starfish',
          angle: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2
        };
        fishRef.current.push(starfish);
      }
      
      // Add treasure chests
      for (let i = 0; i < 2; i++) {
        const treasure: Fish = {
          x: Math.random() * width,
          y: height - Math.random() * 40 - 30,
          vx: 0,
          vy: 0,
          size: Math.random() * 8 + 12,
          color: 'hsl(45, 90%, 70%)',
          type: 'treasure',
          angle: 0,
          phase: Math.random() * Math.PI * 2
        };
        fishRef.current.push(treasure);
      }
      
      // Add seaweed
      for (let i = 0; i < 8; i++) {
        const seaweed: Fish = {
          x: Math.random() * width,
          y: height - Math.random() * 80,
          vx: 0,
          vy: 0,
          size: Math.random() * 15 + 20,
          color: 'hsl(120, 60%, 40%)',
          type: 'seaweed',
          angle: 0,
          phase: Math.random() * Math.PI * 2,
          wiggle: Math.random() * 0.02 + 0.01
        };
        fishRef.current.push(seaweed);
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

    const drawDolphin = (ctx: CanvasRenderingContext2D, dolphin: Fish) => {
      ctx.save();
      ctx.translate(dolphin.x, dolphin.y);
      ctx.rotate(dolphin.angle);
      
      // Dolphin body
      ctx.fillStyle = dolphin.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, dolphin.size, dolphin.size * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Dolphin nose/beak
      ctx.beginPath();
      ctx.ellipse(dolphin.size * 0.8, 0, dolphin.size * 0.3, dolphin.size * 0.2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Dolphin tail
      ctx.beginPath();
      ctx.moveTo(-dolphin.size, 0);
      ctx.lineTo(-dolphin.size * 1.3, -dolphin.size * 0.4);
      ctx.lineTo(-dolphin.size * 1.1, 0);
      ctx.lineTo(-dolphin.size * 1.3, dolphin.size * 0.4);
      ctx.closePath();
      ctx.fill();
      
      // Dolphin fin
      ctx.beginPath();
      ctx.ellipse(0, -dolphin.size * 0.3, dolphin.size * 0.2, dolphin.size * 0.4, Math.PI * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      // Dolphin eye
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(dolphin.size * 0.3, -dolphin.size * 0.15, dolphin.size * 0.08, 0, Math.PI * 2);
      ctx.fill();
      
      // Eye highlight
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(dolphin.size * 0.32, -dolphin.size * 0.17, dolphin.size * 0.03, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawStarfish = (ctx: CanvasRenderingContext2D, starfish: Fish) => {
      ctx.save();
      ctx.translate(starfish.x, starfish.y);
      ctx.rotate(starfish.angle);
      
      // Starfish body (5 arms)
      ctx.fillStyle = starfish.color;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const armLength = starfish.size;
        const x = Math.cos(angle) * armLength;
        const y = Math.sin(angle) * armLength;
        
        if (i === 0) {
          ctx.moveTo(x * 0.3, y * 0.3);
        }
        ctx.lineTo(x, y);
        ctx.lineTo(Math.cos(angle + Math.PI/5) * armLength * 0.3, Math.sin(angle + Math.PI/5) * armLength * 0.3);
      }
      ctx.closePath();
      ctx.fill();
      
      // Starfish center
      ctx.beginPath();
      ctx.arc(0, 0, starfish.size * 0.2, 0, Math.PI * 2);
      ctx.fill();
      
      // Starfish spots
      ctx.fillStyle = starfish.color.replace(')', ', 0.5)').replace('hsl', 'hsla');
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * starfish.size * 0.5;
        const y = Math.sin(angle) * starfish.size * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, starfish.size * 0.05, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    };

    const drawTreasure = (ctx: CanvasRenderingContext2D, treasure: Fish) => {
      ctx.save();
      ctx.translate(treasure.x, treasure.y);
      
      // Treasure chest base
      ctx.fillStyle = 'hsl(25, 60%, 40%)';
      ctx.fillRect(-treasure.size/2, -treasure.size/3, treasure.size, treasure.size/1.5);
      
      // Treasure chest lid
      ctx.fillStyle = 'hsl(25, 60%, 35%)';
      ctx.fillRect(-treasure.size/2, -treasure.size/2, treasure.size, treasure.size/3);
      
      // Gold coins/treasures inside
      if (Math.sin(Date.now() * 0.003 + treasure.phase) > 0.5) {
        ctx.fillStyle = treasure.color;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(-treasure.size/3 + (i * treasure.size/3), -treasure.size/4, treasure.size/8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Chest lock
      ctx.fillStyle = 'hsl(45, 80%, 60%)';
      ctx.fillRect(-treasure.size/8, -treasure.size/6, treasure.size/4, treasure.size/6);
      
      ctx.restore();
    };

    const drawSeaweed = (ctx: CanvasRenderingContext2D, seaweed: Fish) => {
      ctx.save();
      ctx.translate(seaweed.x, seaweed.y);
      
      const sway = Math.sin(Date.now() * (seaweed.wiggle || 0.01) + seaweed.phase) * 15;
      
      // Seaweed fronds
      ctx.strokeStyle = seaweed.color;
      ctx.lineWidth = seaweed.size / 8;
      ctx.lineCap = 'round';
      
      for (let frond = 0; frond < 3; frond++) {
        ctx.beginPath();
        ctx.moveTo(frond * seaweed.size/4 - seaweed.size/3, 0);
        
        for (let segment = 0; segment < 5; segment++) {
          const segmentHeight = seaweed.size / 5;
          const x = (frond * seaweed.size/4 - seaweed.size/3) + Math.sin(segment + sway/10) * (sway/2);
          const y = -segment * segmentHeight;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Small leaves
        ctx.fillStyle = seaweed.color.replace(')', ', 0.7)').replace('hsl', 'hsla');
        for (let leaf = 1; leaf < 4; leaf++) {
          const leafX = (frond * seaweed.size/4 - seaweed.size/3) + Math.sin(leaf + sway/10) * (sway/2);
          const leafY = -leaf * seaweed.size/5;
          ctx.beginPath();
          ctx.ellipse(leafX + seaweed.size/12, leafY, seaweed.size/12, seaweed.size/20, Math.PI/4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
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
        
        // Update angle based on velocity for moving creatures
        if (creature.type === 'fish' || creature.type === 'dolphin') {
          creature.angle = Math.atan2(creature.vy, creature.vx);
        }
        
        // Gentle floating motion for jellyfish and seahorses
        if (creature.type === 'jellyfish' || creature.type === 'seahorse') {
          creature.y += Math.sin(Date.now() * 0.002 + creature.phase) * 0.5;
          creature.x += Math.cos(Date.now() * 0.001 + creature.phase) * 0.3;
        }
        
        // Draw creature
        switch (creature.type) {
          case 'fish':
            drawFish(ctx, creature);
            break;
          case 'dolphin':
            drawDolphin(ctx, creature);
            break;
          case 'jellyfish':
            drawJellyfish(ctx, creature);
            break;
          case 'seahorse':
            drawSeahorse(ctx, creature);
            break;
          case 'starfish':
            drawStarfish(ctx, creature);
            break;
          case 'treasure':
            drawTreasure(ctx, creature);
            break;
          case 'seaweed':
            drawSeaweed(ctx, creature);
            break;
        }
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