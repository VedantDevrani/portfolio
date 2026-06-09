import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutCards, personalInfo } from '../../constants';
import myImage from '../../assets/Myimage.png';

gsap.registerPlugin(ScrollTrigger);

const TiltCard = ({ card, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for buttery smooth snapping
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Map mouse position (-0.5 to 0.5) to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Convert to percentage from center (-0.5 to 0.5)
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-auto lg:h-full group cursor-default"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
    >
      {/* Sci-Fi Data Slate Outer Shell */}
      <div 
        className="relative w-full h-full p-[1px] rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.05)',
        }}
      >
        {/* Animated Holographic Border Spin */}
        <div 
          className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `conic-gradient(from 0deg, transparent 70%, ${card.color} 100%)` }}
        />
        
        {/* Inner Solid Slate Background */}
        <div 
          className="relative w-full h-full flex flex-col p-6 z-10 rounded-2xl"
          style={{
            backgroundImage: 'linear-gradient(135deg, rgba(15,20,35,0.95), rgba(5,8,22,0.95))',
            boxShadow: `inset 0 0 30px rgba(0,0,0,0.8)`,
          }}
        >
          {/* Accent light on top edge inside */}
          <div className="absolute top-0 left-0 w-full h-[1px] opacity-20" style={{ backgroundImage: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }} />

          {/* Icon - Extreme TranslateZ */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-500 group-hover:scale-110"
            style={{
              background: `${card.color}15`,
              border: `1px solid ${card.color}40`,
              boxShadow: `0 0 20px ${card.color}20`,
              transform: 'translateZ(50px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {card.icon}
          </div>

          <h3 
            className="font-display font-black tracking-wide text-white text-xl mb-2 transition-transform duration-500" 
            style={{ transform: 'translateZ(40px)', textShadow: `0 0 10px ${card.color}40` }}
          >
            {card.title}
          </h3>
          
          <p 
            className="text-sm leading-relaxed mb-6 flex-grow transition-transform duration-500" 
            style={{ color: '#9CA3AF', transform: 'translateZ(30px)' }}
          >
            {card.description}
          </p>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-2 transition-transform duration-500" style={{ transform: 'translateZ(20px)' }}>
            {card.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors"
                style={{
                  background: `rgba(0,0,0,0.5)`,
                  border: `1px solid ${card.color}30`,
                  color: card.color,
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Tech Corner Accents */}
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r opacity-30" style={{ borderColor: card.color }} />
        </div>
      </div>
      
      {/* Huge Hover Glow Behind Card */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-3xl"
        style={{ background: `radial-gradient(circle at center, ${card.color}30, transparent 70%)` }}
      />
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-text-animate', {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      data-section="about"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Ambient Sci-Fi Background Geometry */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
        {/* Rotating Tech Rings */}
        <motion.div 
          className="absolute top-[20%] left-[5%] w-64 h-64 border-[1px] rounded-full opacity-20"
          style={{ borderColor: 'rgba(20,184,166,0.3)', borderStyle: 'dashed' }}
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-[10%] left-[2%] w-96 h-96 border-[1px] rounded-full opacity-10"
          style={{ borderColor: 'rgba(139,92,246,0.3)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Glowing Data Lines */}
        <motion.div 
          className="absolute right-[10%] top-[-50%] w-[1px] h-[200%] opacity-20"
          style={{ backgroundImage: 'linear-gradient(to bottom, transparent, #14B8A6, transparent)' }}
          animate={{ y: ['-50%', '50%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute right-[15%] top-[-50%] w-[1px] h-[200%] opacity-20"
          style={{ backgroundImage: 'linear-gradient(to bottom, transparent, #8B5CF6, transparent)' }}
          animate={{ y: ['50%', '-50%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{
              background: 'rgba(139,92,246,0.08)',
              border: '1px solid rgba(139,92,246,0.2)',
              color: '#8B5CF6',
            }}
          >
            About Me
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title text-white mb-4"
          >
            Who I{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #14B8A6, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Am
            </span>
          </motion.h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20 text-center lg:text-left">
          {/* Left - Profile */}
          <div ref={textRef} className="flex flex-col items-center lg:items-start">
            {/* Profile avatar placeholder */}
            <div className="about-text-animate relative w-48 h-48 mx-auto lg:mx-0 mb-8">
              <div
                className="w-full h-full rounded-3xl flex items-center justify-center text-6xl font-display font-black overflow-hidden relative z-10"
                style={{
                  backgroundImage: 'linear-gradient(135deg, rgba(20,184,166,0.1), rgba(139,92,246,0.1))',
                  border: '2px solid rgba(20,184,166,0.2)',
                  boxShadow: '0 0 60px rgba(20,184,166,0.1), 0 0 30px rgba(139,92,246,0.1)',
                }}
              >
                <img src={myImage} alt="Vedant Devrani" className="w-full h-full object-cover" />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-3 -right-6 px-4 py-1.5 rounded-full text-xs font-semibold z-20"
                style={{
                  background: 'rgba(5,8,22,0.95)',
                  border: '1px solid rgba(20,184,166,0.4)',
                  color: '#14B8A6',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                  whiteSpace: 'nowrap',
                }}
              >
                3rd Year BTech
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-4">
              <p className="about-text-animate text-base leading-relaxed" style={{ color: '#B0B7C3' }}>
                Hey! I'm <span className="text-white font-semibold">Vedant Devrani</span>, a B.Tech Computer Science student
                with a deep passion for building software that people love to use. My journey into programming started
                with a simple curiosity — <em style={{ color: '#14B8A6' }}>how does the internet actually work?</em>
              </p>
              <p className="about-text-animate text-base leading-relaxed" style={{ color: '#B0B7C3' }}>
                Today, I build full-stack web applications, compete in coding challenges, and constantly push myself
                to grow as an engineer. I believe in writing <span className="text-white">clean, maintainable code</span>{' '}
                and creating experiences that feel both powerful and intuitive.
              </p>
              <p className="about-text-animate text-base leading-relaxed" style={{ color: '#B0B7C3' }}>
                My goal is to join a forward-thinking team where I can contribute meaningfully,
                ship real products, and grow fast. I'm actively looking for{' '}
                <span style={{ color: '#14B8A6' }}>software engineering internship opportunities</span>.
              </p>
            </div>

            {/* Quick facts */}
            <div className="about-text-animate grid grid-cols-2 gap-4 mt-8">
              {[
                { label: 'Location', value: 'India 🇮🇳' },
                { label: 'Status', value: 'Open to Work ✅' },
                { label: 'Focus', value: 'Full Stack + DSA' },
                { label: 'Education', value: 'B.Tech CSE' },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="text-xs mb-1" style={{ color: '#6B7280' }}>
                    {fact.label}
                  </div>
                  <div className="text-sm font-medium text-white">{fact.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Story highlights */}
          <div className="space-y-6">
            {[
              {
                icon: '🚀',
                title: 'Building Real Products',
                desc: 'I focus on shipping complete, polished projects — not just tutorials. Every project teaches me architecture, trade-offs, and real-world engineering.',
                color: '#14B8A6',
              },
              {
                icon: '🧩',
                title: 'DSA & Competitive Programming',
                desc: 'Solving 1000+ problems across LeetCode, CodeChef, and GFG has sharpened my problem-solving intuition and algorithmic thinking.',
                color: '#8B5CF6',
              },
              {
                icon: '📐',
                title: 'Engineering Quality First',
                desc: 'Clean code, good system design, and thoughtful UX are non-negotiables. I care about the quality of what I build, not just the quantity.',
                color: '#4338CA',
              },
              {
                icon: '🌱',
                title: 'Continuous Learning',
                desc: 'Every week I explore new technologies, read engineering blogs, and work on something new. Growth is my constant north star.',
                color: '#F59E0B',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-xl group text-center sm:text-left"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'all 0.3s',
                }}
                whileHover={{ borderColor: `${item.color}25`, backgroundColor: `${item.color}05` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}20` }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#B0B7C3' }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aboutCards.map((card, i) => (
            <TiltCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
