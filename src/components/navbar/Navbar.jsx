import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { navLinks } from '../../constants';
import myImage from '../../assets/Myimage.png';
import Magnetic from '../common/Magnetic';

const Navbar = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Internal state to avoid intermediate jumps during smooth scrolling
  const [internalActive, setInternalActive] = useState(activeSection);
  const [isClicking, setIsClicking] = useState(false);
  const clickTimeoutRef = useRef(null);

  useEffect(() => {
    if (!isClicking) {
      setInternalActive(activeSection);
    }
  }, [activeSection, isClicking]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      setIsClicking(true);
      setInternalActive(id);
      
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        setIsClicking(false);
      }, 1000); // Wait for smooth scroll to finish before listening to scroll spy again
      
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-[100]"
      >
        <div
          className="relative transition-all duration-500 rounded-full"
          style={{
            background: scrolled
              ? 'rgba(5,8,22,0.75)'
              : 'rgba(5,8,22,0.4)',
            backdropFilter: 'blur(24px)',
            border: scrolled ? '1px solid rgba(0,229,255,0.3)' : '1px solid rgba(255,255,255,0.08)',
            boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(0,229,255,0.1) inset' : '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          {/* Top glowing edge when scrolled */}
          {scrolled && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-80" />
          )}

          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              className="flex items-center gap-3 group relative"
              whileHover={{ scale: 1.05 }}
            >
              {/* Spinning Sci-Fi Ring around logo */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-dashed border-[#00E5FF]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <img
                  src={myImage}
                  alt="Logo"
                  className="w-8 h-8 rounded-full object-cover relative z-10"
                  style={{ boxShadow: '0 0 15px rgba(0,229,255,0.4)' }}
                />
              </div>
              <span className="font-display font-bold text-white hidden sm:block text-lg tracking-wide group-hover:text-shadow transition-all duration-300" style={{ textShadow: '0 0 10px rgba(0,229,255,0)' }}>
                Vedant<span style={{ color: '#00E5FF' }}>.dev</span>
              </span>
            </motion.a>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = internalActive === sectionId;

                return (
                  <Magnetic key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                      className="relative px-5 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full"
                      style={{
                        color: isActive ? '#00E5FF' : '#8B95A5',
                        textShadow: isActive ? '0 0 10px rgba(0,229,255,0.5)' : 'none',
                      }}
                    >
                      {isActive && (
                        <span
                          className="absolute inset-0 rounded-full"
                          style={{ 
                            background: 'rgba(0,229,255,0.1)', 
                            border: '1px solid rgba(0,229,255,0.3)',
                            boxShadow: '0 0 15px rgba(0,229,255,0.15) inset'
                          }}
                        />
                      )}
                      <span className="relative z-10 hover:text-white transition-colors">{link.label}</span>
                    </a>
                  </Magnetic>
                );
              })}
            </div>

            {/* CTA + Mobile menu */}
            <div className="flex items-center gap-3">
              <Magnetic>
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-black text-black tracking-widest uppercase relative overflow-hidden group"
                  style={{ background: '#00E5FF', boxShadow: '0 0 20px rgba(0,229,255,0.4)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                {/* Sci-Fi button scanning line */}
                <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 group-hover:animate-[scan_1.5s_ease-in-out_infinite]" />
                <span className="relative z-10">Resume</span>
              </motion.a>
              </Magnetic>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 rounded-full text-[#00E5FF] border border-[#00E5FF]/30 hover:bg-[#00E5FF]/10 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <HiX size={20} /> : <HiMenuAlt4 size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-[99] lg:hidden"
            style={{
              background: 'rgba(5,8,22,0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    color: internalActive === link.href.replace('#', '') ? '#00E5FF' : '#B0B7C3',
                    background: internalActive === link.href.replace('#', '') ? 'rgba(0,229,255,0.08)' : 'transparent',
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-semibold text-black"
                  style={{ background: 'linear-gradient(135deg, #00E5FF, #7C3AED)' }}
                >
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
