import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = Math.random() > 0.5 ? '#00E5FF' : '#7C3AED';
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;

        if (this.life > this.maxLife) {
          this.reset();
        }

        // Fade in/out
        const lifeRatio = this.life / this.maxLife;
        this.currentOpacity = this.opacity * Math.sin(lifeRatio * Math.PI);
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.currentOpacity || 0;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Init particles
    for (let i = 0; i < 120; i++) {
      particles.push(new Particle());
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.002;

      // Draw gradient mesh orbs
      const orbs = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, r: 300, color: 'rgba(0,229,255,0.04)' },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, r: 350, color: 'rgba(124,58,237,0.04)' },
        { x: canvas.width * 0.5 + Math.sin(time) * 100, y: canvas.height * 0.5 + Math.cos(time) * 50, r: 250, color: 'rgba(232,121,249,0.03)' },
      ];

      orbs.forEach((orb) => {
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connections
      ctx.save();
      particles.forEach((p1, i) => {
        particles.slice(i + 1, i + 5).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.globalAlpha = ((100 - dist) / 100) * 0.08;
            ctx.strokeStyle = '#00E5FF';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 1 }}
      />

      {/* CSS gradient mesh */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 800px 600px at 20% 30%, rgba(0,229,255,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 600px 800px at 80% 70%, rgba(124,58,237,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 400px 400px at 50% 50%, rgba(232,121,249,0.02) 0%, transparent 70%)
          `,
        }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Grid lines */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </>
  );
};

export default AnimatedBackground;
