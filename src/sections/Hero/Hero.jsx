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
    <span className="font-mono" style={{ color: '#14B8A6' }}>
      {displayText}
      <span className="animate-blink" style={{ color: '#14B8A6' }}>|</span>
    </span>
  );
};

// Floating 3D Code Symbol Component
const CodeSymbol = ({ text, delay, duration, color, top, left, right, bottom, size }) => (
  <motion.div
    className="absolute font-mono font-bold select-none pointer-events-none opacity-20 z-0"
    style={{ color, top, left, right, bottom, fontSize: size }}
    animate={{ 
      y: [0, -30, 0], 
      rotateX: [0, 20, -20, 0],
      rotateY: [0, 20, -20, 0],
      opacity: [0.1, 0.4, 0.1]
    }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    {text}
  </motion.div>
);

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Full-width centered layout — background shows through right side */}
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-80px)] pt-4 pb-32 lg:pt-8 lg:pb-40 relative">

          {/* LEFT — Hero content */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-10 relative">
            


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
                  background: 'rgba(20,184,166,0.08)',
                  border: '1px solid rgba(20,184,166,0.25)',
                  color: '#14B8A6',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#14B8A6', boxShadow: '0 0 6px #14B8A6' }} />
                Available for Work
              </span>
            </motion.div>

            {/* Heading */}
            <div ref={headingRef} className="relative z-10">
              {/* Developer Comment Intro */}
              <motion.div 
                className="font-mono text-sm md:text-base mb-3 font-bold opacity-80"
                style={{ color: '#8B5CF6' }} // Purple comment color
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {`// HELLO WORLD, I'm`}
              </motion.div>
              
              <h1
                className="font-display font-black leading-[1.02] mb-2"
                style={{ fontSize: 'clamp(3rem, 7.5vw, 6rem)', letterSpacing: '-0.03em' }}
              >
                <span className="text-white">Vedant</span>
                <br />
                <span style={{
                  backgroundImage: 'linear-gradient(135deg, #14B8A6 0%, #8B5CF6 55%, #4338CA 100%)',
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
                style={{ background: '#14B8A6' }}
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(20,184,166,0.4)',
                    '0 0 30px rgba(20,184,166,0.8)',
                    '0 0 15px rgba(20,184,166,0.4)'
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
                style={{ border: '1px solid rgba(20,184,166,0.3)', color: '#14B8A6', background: 'rgba(20,184,166,0.05)', backdropFilter: 'blur(8px)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(20,184,166,0.25)', borderColor: '#14B8A6' }}
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
                  <div className="font-display font-bold text-2xl" style={{ color: '#14B8A6', textShadow: '0 0 15px rgba(20,184,166,0.4)' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Empty block to push content to the left side in grid-cols-2 */}
          <div className="hidden lg:block w-full h-full pointer-events-none"></div>
        </div>


      </div>
    </section>
  );
};

export default Hero;
