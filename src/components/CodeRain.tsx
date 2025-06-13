import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const CodeRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()<>=+-*/&|!@#$%^';
    const drops: number[] = [];
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    const draw = () => {
      ctx.fillStyle = isDark ? 'rgba(17, 24, 39, 0.05)' : 'rgba(249, 250, 251, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = isDark ? '#10b981' : '#059669';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = codeChars[Math.floor(Math.random() * codeChars.length)];
        ctx.fillText(text, i * fontSize, drops[i]);

        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += fontSize;
      }
    };

    const interval = setInterval(draw, 100);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-20 z-0"
      style={{ mixBlendMode: isDark ? 'screen' : 'multiply' }}
    />
  );
};

export default CodeRain;