import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>';

const GlitchChar = ({ targetChar, isDecoding = false }) => {
  const [char, setChar] = useState(targetChar === '\u00A0' ? '\u00A0' : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]);
  
  useEffect(() => {
    if (!isDecoding || targetChar === '\u00A0') {
      if (targetChar === '\u00A0') setChar('\u00A0');
      return;
    }
    
    // Scramble for a random duration between 600ms and 1800ms
    const totalDuration = Math.random() * 1200 + 600;
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed > totalDuration) {
        setChar(targetChar);
        clearInterval(interval);
      } else {
        setChar(CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]);
      }
    }, 40);
    
    return () => clearInterval(interval);
  }, [targetChar, isDecoding]);

  return <>{char}</>;
};

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textContainerRef = useRef(null);
  const charsRef = useRef([]);
  const progressContainerRef = useRef(null);
  const progressBarRef = useRef(null);
  const scanlineRef = useRef(null);
  const percentageRef = useRef(null);
  
  const [isDecoding, setIsDecoding] = useState(false);
  const [loadingText, setLoadingText] = useState('INITIALIZING...');

  const name = "VEDANT DEVRANI";
  // Convert spaces to non-breaking space for layout preservation
  const nameArray = name.split('').map(char => char === ' ' ? '\u00A0' : char);

  useEffect(() => {
    // Artificial progress update
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 3 + 0.5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
      }
      if (percentageRef.current) {
        percentageRef.current.innerText = `${Math.floor(progress)}%`;
      }
    }, 50);

    // Dynamic text sequence
    const statuses = ['INITIALIZING...', 'ESTABLISHING CONNECTION...', 'DECRYPTING IDENTITY...', 'SYSTEM READY'];
    let statusIndex = 0;
    const textInterval = setInterval(() => {
      statusIndex = Math.min(statusIndex + 1, statuses.length - 1);
      setLoadingText(statuses[statusIndex]);
    }, 800);

    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(progressInterval);
        clearInterval(textInterval);
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: onComplete,
        });
      },
    });

    // Initial setup
    gsap.set(charsRef.current, { yPercent: 120 }); // Hidden below mask (Concept C)
    gsap.set(progressContainerRef.current, { opacity: 0 });
    gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left' });
    gsap.set(scanlineRef.current, { top: '-20%', opacity: 0 });

    // Timeline Sequence
    tl.to(progressContainerRef.current, { opacity: 1, duration: 0.5 })
      
      // Trigger decoding state for GlitchChar components (Concept A)
      .call(() => setIsDecoding(true), [], 0)
      
      // Staggered text reveal sliding up (Concept C)
      .to(charsRef.current, {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'expo.out'
      }, 0.2)
      
      // Progress bar fill
      .to(progressBarRef.current, { scaleX: 1, duration: 2.8, ease: 'power2.inOut' }, 0.5)
      
      // Sweep the glowing scanning line down (Concept A)
      .to(scanlineRef.current, { opacity: 1, duration: 0.2 }, 1.2)
      .to(scanlineRef.current, { top: '120%', duration: 1.5, ease: 'power1.inOut' }, 1.2)
      .to(scanlineRef.current, { opacity: 0, duration: 0.2 }, 2.7)
      
      // Text smoothly grows in size once it successfully comes on screen
      .to(textContainerRef.current, { scale: 1.15, duration: 2.5, ease: 'power1.out' }, 1.0)
      
      // Make the 4 decorative edges disappear as the text grows
      .to('.tech-corner', { opacity: 0, scale: 1.2, duration: 1.0, ease: 'power2.out' }, 1.0)
      
      // Letter tracking out (spread apart) & massive scale/fade out (Concept C)
      .to(textContainerRef.current, {
        letterSpacing: '0.4em',
        scale: 5,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.0,
        ease: 'power3.in'
      }, 3.5)
      
      .to(progressContainerRef.current, { opacity: 0, duration: 0.5 }, 3.8);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Subtle Background Cyber Grid (Concept A) */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#14B8A6 1px, transparent 1px), linear-gradient(90deg, #14B8A6 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative flex flex-col items-center justify-center z-10 w-full max-w-xl px-8 py-10">
        
        {/* Decorative Hacker Tech Corners (Concept A) */}
        <div className="tech-corner absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#14B8A6] opacity-60" />
        <div className="tech-corner absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#14B8A6] opacity-60" />
        <div className="tech-corner absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#14B8A6] opacity-60" />
        <div className="tech-corner absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#14B8A6] opacity-60" />

        {/* Typography Container */}
        <div className="relative mb-8 w-full text-center py-4">
          {/* Scanning Line overlay Mask */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div ref={scanlineRef} className="absolute left-0 right-0 h-[2px] bg-[#14B8A6] shadow-[0_0_20px_3px_#14B8A6] mix-blend-screen" />
          </div>

          <div 
            ref={textContainerRef}
            className="flex items-center justify-center text-center font-display font-black text-3xl md:text-5xl text-white whitespace-nowrap"
            style={{ letterSpacing: '0em', transformOrigin: 'center' }}
          >
            {nameArray.map((char, i) => (
              <div key={i} className="overflow-hidden pb-1" style={{ display: 'inline-block' }}>
                <span
                  ref={(el) => (charsRef.current[i] = el)}
                  className="inline-block"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #14B8A6, #A78BFA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <GlitchChar targetChar={char} isDecoding={isDecoding} />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Minimalist Cyber Progress Bar (Hybrid) */}
        <div ref={progressContainerRef} className="flex flex-col items-center w-full max-w-[280px] mt-2">
          <div className="w-full flex justify-between text-[#14B8A6] font-mono text-[10px] md:text-xs tracking-widest font-bold mb-2 opacity-80">
            <span>{loadingText}</span>
            <span ref={percentageRef}>0%</span>
          </div>
          
          <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute inset-0 h-full"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent, #14B8A6, #8B5CF6)', boxShadow: '0 0 10px #14B8A6' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Loader;
