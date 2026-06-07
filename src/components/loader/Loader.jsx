import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import myImage from '../../assets/Myimage.png';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const particlesRef = useRef([]);
  const nameRef = useRef(null);

  const [loadingText, setLoadingText] = useState('INITIALIZING...');

  useEffect(() => {
    // Fun typing effect for the loading status
    const statuses = ['INITIALIZING...', 'ESTABLISHING CONNECTION...', 'LOADING ASSETS...', 'SYSTEM READY'];
    let statusIndex = 0;
    const interval = setInterval(() => {
      statusIndex = Math.min(statusIndex + 1, statuses.length - 1);
      setLoadingText(statuses[statusIndex]);
    }, 600);

    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(interval);
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.2,
          onComplete: onComplete,
        });
      },
    });

    // Initial state
    gsap.set([logoRef.current, textRef.current], { opacity: 0, scale: 0.8 });
    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left' });
    
    // Continuous rotation for rings
    gsap.to(ring1Ref.current, { rotation: 360, duration: 4, repeat: -1, ease: 'linear' });
    gsap.to(ring2Ref.current, { rotation: -360, duration: 6, repeat: -1, ease: 'linear' });

    // Main animation sequence
    tl.to(logoRef.current, { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' })
      .to(textRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }, '-=0.5')
      .to(progressRef.current, { scaleX: 1, duration: 2.5, ease: 'power2.inOut' }, '-=0.2')
      // Fade out logo, progress bar, and other UI elements
      .to([logoRef.current, '.loader-ui-element'], { opacity: 0, duration: 0.4 }, '+=0.2')
      // Massively scale up the name to cover the screen
      .to(nameRef.current, { scale: 80, opacity: 0, duration: 1.2, ease: 'power3.in' }, '-=0.1');

    // Particle implosion -> explosion
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    particlesRef.current.forEach((el, i) => {
      if (!el) return;
      
      // Start spread out across the ENTIRE screen
      gsap.set(el, {
        x: gsap.utils.random(-w / 2, w / 2),
        y: gsap.utils.random(-h / 2, h / 2),
        opacity: 0,
        scale: 0,
      });

      // Implode into center, then explode out to the ENTIRE screen
      gsap.to(el, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: gsap.utils.random(1, 3),
        duration: 1,
        ease: 'power2.in',
        delay: i * 0.02,
      });

      gsap.to(el, {
        x: gsap.utils.random(-w, w),
        y: gsap.utils.random(-h, h),
        opacity: 0,
        scale: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 1.5 + i * 0.02,
      });
    });

    return () => {
      clearInterval(interval);
      tl.kill();
    };
  }, [onComplete]);

  const particles = Array.from({ length: 80 });

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#000000' }} // Pure black background
    >
      {/* Dynamic Particle Field */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-screen">
        {particles.map((_, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? '#00E5FF' : '#7C3AED',
              boxShadow: `0 0 10px ${i % 2 === 0 ? '#00E5FF' : '#7C3AED'}`,
              left: '50%',
              top: '50%',
            }}
          />
        ))}
      </div>

      {/* Cybernetic Logo Container */}
      <div ref={logoRef} className="mb-12 relative flex items-center justify-center">
        {/* Outer Ring */}
        <div 
          ref={ring1Ref}
          className="absolute w-32 h-32 rounded-full border border-dashed opacity-50"
          style={{ borderColor: '#00E5FF' }}
        />
        {/* Inner Ring */}
        <div 
          ref={ring2Ref}
          className="absolute w-24 h-24 rounded-full border-2 border-dotted opacity-70"
          style={{ borderColor: '#7C3AED' }}
        />
        
        {/* Glowing Logo */}
        <div className="relative z-10 w-16 h-16 rounded-full overflow-hidden">
          <img
            src={myImage}
            alt="Logo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 rounded-full border border-white/20 shadow-[inset_0_0_20px_rgba(0,229,255,0.5)]" />
        </div>
        
        {/* Ambient Glow */}
        <div className="absolute w-full h-full rounded-full opacity-30 blur-2xl animate-pulse" style={{ background: '#00E5FF' }} />
      </div>

      {/* Text & Progress */}
      <div ref={textRef} className="text-center w-full max-w-xs relative z-10 flex flex-col items-center justify-center">
        {/* The Name that will grow massively */}
        <h1 
          ref={nameRef}
          className="font-display font-black text-2xl text-white tracking-[0.2em] uppercase mb-2 whitespace-nowrap origin-center" 
          style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)', willChange: 'transform' }}
        >
          Vedant Devrani
        </h1>
        
        <div className="loader-ui-element flex items-center justify-between mb-3 text-[10px] font-mono font-bold tracking-widest text-[#00E5FF] w-full">
          <span>{loadingText}</span>
          <span className="animate-pulse">_</span>
        </div>

        {/* High-tech Progress bar */}
        <div className="loader-ui-element w-full h-1 relative overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.05)', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)' }}>
          <div
            ref={progressRef}
            className="absolute inset-0 h-full rounded-full"
            style={{ 
              background: 'linear-gradient(90deg, transparent, #00E5FF, #7C3AED)',
              boxShadow: '0 0 10px #00E5FF'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
