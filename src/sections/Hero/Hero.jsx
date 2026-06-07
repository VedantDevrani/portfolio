import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { 
  SiReact, SiNodedotjs, SiMongodb, SiTypescript, 
  SiPython, SiCplusplus, SiPostgresql, SiTailwindcss 
} from 'react-icons/si';
import { gsap } from 'gsap';
import { roles } from '../../constants';

// Typewriter role switcher
const RoleSwitcher = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentRole = roles[currentIndex];
    const speed = isDeleting ? 40 : 80;
    const delay = isDeleting
      ? charIndex === 0 ? 800 : speed
      : charIndex === currentRole.length ? 2000 : speed;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentRole.length) {
          setDisplayText(currentRole.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentRole.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % roles.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentIndex]);

  return (
    <span className="font-mono" style={{ color: '#00E5FF' }}>
      {displayText}
      <span className="animate-blink" style={{ color: '#00E5FF' }}>|</span>
    </span>
  );
};

const Hero = () => {
  const heroRef   = useRef(null);
  const headingRef  = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef      = useRef(null);
  const badgeRef    = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    gsap.set([badgeRef.current, headingRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0, y: 40,
    });

    tl.to(badgeRef.current,    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      .to(headingRef.current,  { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .to(ctaRef.current,      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');

    return () => tl.kill();
  }, []);

  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      data-section="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center"
      style={{ paddingTop: '80px' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.05) 0%, transparent 60%)',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Full-width centered layout — background shows through right side */}
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-80px)] py-4 lg:py-8">

          {/* LEFT — Hero content */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-10 relative">
            
            {/* Ambient Background Orb for Hero Content */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full opacity-20 blur-[100px] pointer-events-none -z-10"
              style={{ background: 'radial-gradient(circle, #00E5FF 0%, #7C3AED 50%, transparent 100%)' }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Badge */}
            <motion.div 
              ref={badgeRef} 
              className="mb-4"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{
                  background: 'rgba(0,229,255,0.08)',
                  border: '1px solid rgba(0,229,255,0.25)',
                  color: '#00E5FF',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00E5FF', boxShadow: '0 0 6px #00E5FF' }} />
                Available for Work
              </span>
            </motion.div>

            {/* Heading */}
            <div ref={headingRef}>
              <h1
                className="font-display font-black leading-[1.02] mb-2"
                style={{ fontSize: 'clamp(3rem, 7.5vw, 6rem)', letterSpacing: '-0.03em' }}
              >
                <span className="text-white">Vedant</span>
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #00E5FF 0%, #7C3AED 55%, #E879F9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Devrani
                </span>
              </h1>

              <div className="font-display font-semibold mb-4" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', minHeight: '2em' }}>
                <RoleSwitcher />
              </div>
            </div>

            {/* Bio */}
            <p ref={subtitleRef} className="text-base leading-relaxed mb-6 max-w-lg" style={{ color: '#B0B7C3' }}>
              Passionate B.Tech 3rd year student building{' '}
              <span style={{ color: '#fff' }}>scalable web applications</span>,
              solving algorithmic challenges, and crafting{' '}
              <span style={{ color: '#fff' }}>modern digital experiences</span>.
              Engineering from India 🇮🇳
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap justify-center lg:justify-start gap-3">
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 rounded-full text-sm font-bold text-black tracking-widest uppercase transition-transform relative overflow-hidden group"
                style={{ background: '#00E5FF' }}
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(0,229,255,0.4)',
                    '0 0 30px rgba(0,229,255,0.8)',
                    '0 0 15px rgba(0,229,255,0.4)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects <FaArrowRight size={12} />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm"
                style={{ border: '1px solid rgba(0,229,255,0.3)', color: '#00E5FF', background: 'rgba(0,229,255,0.05)', backdropFilter: 'blur(8px)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,229,255,0.25)', borderColor: '#00E5FF' }}
                whileTap={{ scale: 0.97 }}
              >
                <FaDownload size={12} /> Resume
              </motion.a>

              <motion.button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#B0B7C3', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
                whileTap={{ scale: 0.97 }}
              >
                <HiMail size={14} /> Contact
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10 mt-8 pt-6 w-full"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              {[
                { label: 'Projects', value: '15+' },
                { label: 'DSA Problems', value: '1K+' },
                { label: 'Hackathons', value: '5+' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-bold text-2xl" style={{ color: '#00E5FF', textShadow: '0 0 15px rgba(0,229,255,0.4)' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Empty space for 3D background */}
          <div className="relative h-[480px] lg:h-[620px] hidden lg:block z-10 pointer-events-none" />
        </div>

        {/* Improved Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <div className="w-6 h-10 rounded-full border-2 border-[#00E5FF]/40 flex justify-center p-1 shadow-[0_0_15px_rgba(0,229,255,0.15)] bg-[#050816]/50 backdrop-blur-sm">
            <motion.div
              className="w-1.5 h-3 rounded-full bg-[#00E5FF]"
              style={{ boxShadow: '0 0 10px #00E5FF' }}
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00E5FF] animate-pulse">
            Scroll To Explore
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
