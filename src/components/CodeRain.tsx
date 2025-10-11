import React, { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const CodeRain: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const { isDark } = useTheme();

  const draw = useCallback((
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    drops: number[],
    codeChars: string,
    fontSize: number,
    isDark: boolean
  ) => {
    ctx.fillStyle = isDark ? 'rgba(17, 24, 39, 0.05)' : 'rgba(249, 250, 251, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = isDark ? '#10b981' : '#059669';
    ctx.font = `${fontSize}px monospace`;

    // Optimize: Only update every 3rd column for smoother performance
    for (let i = 0; i < drops.length; i += 3) {
      const text = codeChars[Math.floor(Math.random() * codeChars.length)];
      ctx.fillText(text, i * fontSize, drops[i]);

      if (drops[i] > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += fontSize;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      // Performance optimization: disable unnecessary features
      desynchronized: true,
    });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Throttle resize events
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 250);
    };

    window.addEventListener('resize', handleResize);

    const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()<>=+-*/&|!@#$%^';
    const drops: number[] = [];
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    // Use requestAnimationFrame for better performance, limit to ~10 FPS
    const animate = (currentTime: number) => {
      const elapsed = currentTime - lastFrameTimeRef.current;

      // Only draw every 100ms (10 FPS) instead of 60 FPS
      if (elapsed > 100) {
        draw(ctx, canvas, drops, codeChars, fontSize, isDark);
        lastFrameTimeRef.current = currentTime;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isDark, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-20 z-0"
      style={{ mixBlendMode: isDark ? 'screen' : 'multiply' }}
    />
  );
});

CodeRain.displayName = 'CodeRain';

export default CodeRain;