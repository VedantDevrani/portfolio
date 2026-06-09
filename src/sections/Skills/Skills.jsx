import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  { key: 'frontend', label: 'Frontend', icon: '⚛️' },
  { key: 'backend', label: 'Backend', icon: '⚙️' },
  { key: 'dsa', label: 'DSA', icon: '🧩' },
  { key: 'programming', label: 'Languages', icon: '💻' },
  { key: 'tools', label: 'Tools', icon: '🛠️' },
];

import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss, SiHtml5,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiFirebase, SiCplusplus, SiPython,
  SiGit, SiDocker, SiPostman, SiFigma
} from 'react-icons/si';
import { FaCode, FaNetworkWired, FaServer, FaDatabase, FaPuzzlePiece, FaAws } from 'react-icons/fa';

const skillMap = {
  'React.js': { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#FFFFFF' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'HTML & CSS': { icon: SiHtml5, color: '#E34F26' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Express.js': { icon: SiExpress, color: '#CCCCCC' },
  'MongoDB': { icon: SiMongodb, color: '#47A248' },
  'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
  'REST APIs': { icon: FaNetworkWired, color: '#14B8A6' },
  'Firebase': { icon: SiFirebase, color: '#FFCA28' },
  'C++': { icon: SiCplusplus, color: '#00599C' },
  'Python': { icon: SiPython, color: '#3776AB' },
  'Git & GitHub': { icon: SiGit, color: '#F05032' },
  'Docker': { icon: SiDocker, color: '#2496ED' },
  'AWS Basics': { icon: FaAws, color: '#FF9900' },
  'Postman': { icon: SiPostman, color: '#FF6C37' },
  'Figma': { icon: SiFigma, color: '#F24E1E' },
  'VS Code': { icon: FaCode, color: '#007ACC' },
  'Arrays & Strings': { icon: FaCode, color: '#4338CA' },
  'Trees & Graphs': { icon: FaNetworkWired, color: '#4338CA' },
  'Dynamic Programming': { icon: FaPuzzlePiece, color: '#4338CA' },
  'Sorting & Searching': { icon: FaDatabase, color: '#4338CA' },
  'Recursion & Backtracking': { icon: FaServer, color: '#4338CA' },
};

const SkillCard = ({ skill, index, category, color = '#14B8A6' }) => {
  const barRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  // Determine rarity
  const getRarity = (level) => {
    if (level >= 90) return 'LEGENDARY';
    if (level >= 80) return 'EPIC';
    return 'RARE';
  };
  const rarity = getRarity(skill.level);

  useEffect(() => {
    if (!barRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated) {
        setAnimated(true);
        gsap.fromTo(barRef.current, { width: '0%' }, {
          width: `${skill.level}%`,
          duration: 1.5,
          ease: 'power3.out',
          delay: index * 0.1,
        });
      }
    }, { threshold: 0.3 });
    observer.observe(barRef.current.parentElement);
    return () => observer.disconnect();
  }, [skill.level, index, animated]);

  const skillMeta = skillMap[skill.name] || {};
  const skillColor = skillMeta.color || color;
  const IconComponent = skillMeta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="relative w-full aspect-[4/5] rounded-xl overflow-hidden group cursor-pointer"
      whileHover={{ scale: 1.02 }}
    >
      {/* Rotating gradient background for the border */}
      <div 
        className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] z-0 opacity-80"
        style={{
          background: `conic-gradient(from 0deg, transparent 70%, ${skillColor} 100%)`,
        }}
      />
      
      {/* Inner card with solid background (leaves 1px border) */}
      <div 
        className="absolute inset-[1px] rounded-[11px] z-10"
        style={{
          background: 'rgba(5,8,22,0.95)',
        }}
      >
        {/* Sci-fi corner brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l opacity-50 group-hover:opacity-100 transition-opacity" style={{ borderColor: skillColor }} />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r opacity-50 group-hover:opacity-100 transition-opacity" style={{ borderColor: skillColor }} />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l opacity-50 group-hover:opacity-100 transition-opacity" style={{ borderColor: skillColor }} />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r opacity-50 group-hover:opacity-100 transition-opacity" style={{ borderColor: skillColor }} />

        {/* Rarity & Category */}
        <div className="absolute top-4 left-4 z-20 flex flex-col items-start gap-1">
          <div className="flex items-center gap-1.5" style={{ color: skillColor }}>
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: skillColor, boxShadow: `0 0 8px ${skillColor}` }} />
            <span className="text-[10px] font-black tracking-widest">{rarity}</span>
          </div>
          <div 
            className="px-2 py-0.5 border text-[9px] font-bold tracking-widest uppercase"
            style={{ borderColor: skillColor, color: skillColor, background: `${skillColor}10` }}
          >
            {category}
          </div>
        </div>

        {/* Center glowing diamond with rotating border */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 z-20">
          <div className="relative w-20 h-20 group-hover:scale-110 transition-transform duration-500">
            {/* Static background square behind the rotating border */}
            <div 
              className="absolute inset-1.5 rounded-[14px] transition-all duration-700 ease-in-out group-hover:scale-75 group-hover:rotate-45"
              style={{ 
                background: `${skillColor}20`, 
                boxShadow: `0 0 20px ${skillColor}60`,
                border: `1px solid ${skillColor}30`
              }} 
            />
            {/* Rotating Square shape border */}
            <div 
              className="absolute inset-0 rounded-2xl animate-[spin_6s_linear_infinite] group-hover:[animation-duration:0.8s]"
              style={{ 
                border: `1px solid ${skillColor}60`,
                boxShadow: `inset 0 0 20px ${skillColor}20, 0 0 30px ${skillColor}30`,
                backgroundImage: `linear-gradient(135deg, ${skillColor}20, transparent)`
              }} 
            />
            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center text-4xl transition-all duration-500 ease-out group-hover:scale-125 group-hover:-rotate-12" style={{ color: skillColor, textShadow: `0 0 20px ${skillColor}80` }}>
              {IconComponent ? <IconComponent /> : <span>{skill.icon}</span>}
            </div>
          </div>

          {/* Skill Name */}
          <h3 className="mt-8 font-black tracking-wide text-lg text-white group-hover:text-shadow transition-all duration-300" style={{ textShadow: `0 0 10px ${skillColor}00` }}>
            {skill.name}
          </h3>
        </div>

        {/* Bottom Power Meter */}
        <div className="absolute bottom-5 left-5 right-5 z-20">
          <div className="flex justify-between items-end mb-1">
            <span className="text-[10px] font-mono tracking-widest" style={{ color: '#6B7280' }}>PWR</span>
            <span className="text-sm font-black font-mono" style={{ color: skillColor }}>{skill.level}</span>
          </div>
          <div className="h-1 bg-white/10 relative overflow-hidden">
            <div 
              ref={barRef}
              className="absolute top-0 left-0 h-full"
              style={{ 
                backgroundImage: `linear-gradient(90deg, ${skillColor}80, ${skillColor})`,
                boxShadow: `0 0 10px ${skillColor}`,
                width: '0%' 
              }} 
            />
          </div>
        </div>

        {/* Hover ambient glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-10"
          style={{ background: `radial-gradient(circle at center, ${skillColor}, transparent)` }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const sectionRef = useRef(null);

  const tabColors = {
    frontend: '#14B8A6',
    backend: '#8B5CF6',
    dsa: '#4338CA',
    programming: '#F59E0B',
    tools: '#14B8A6',
  };

  const currentColor = tabColors[activeTab];
  const currentSkills = skillsData[activeTab] || [];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 300]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [360, 0]);

  return (
    <section
      id="skills"
      data-section="skills"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Enhanced Cyber Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base Glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)',
          }}
        />
        
        {/* 3D Perspective Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20,184,166, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20,184,166, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
            transformOrigin: 'top center',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          }}
        />

        {/* Scroll Parallax Floating Shapes */}
        <motion.div 
          style={{ y: y1, rotate: rotate1 }} 
          className="absolute top-[10%] left-[5%] w-32 h-32 border border-cyan-500/20 rounded-full flex items-center justify-center opacity-30"
        >
          <div className="w-16 h-16 border border-purple-500/20 rounded-full" />
        </motion.div>
        
        <motion.div 
          style={{ y: y2, rotate: rotate2 }} 
          className="absolute bottom-[20%] right-[5%] w-48 h-48 border border-purple-500/20 rounded-full flex items-center justify-center opacity-30"
        >
          <div className="w-24 h-24 border border-cyan-500/20 rounded-full" />
        </motion.div>

        {/* Small floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              y: Math.random() * 1000,
              x: Math.random() * 1000,
              opacity: 0.1,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -200 - 100],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: i % 2 === 0 ? '#14B8A6' : '#8B5CF6',
              boxShadow: `0 0 10px ${i % 2 === 0 ? '#14B8A6' : '#8B5CF6'}`,
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{
              background: 'rgba(20,184,166,0.08)',
              border: '1px solid rgba(20,184,166,0.2)',
              color: '#14B8A6',
            }}
          >
            Technical Arsenal
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-white mb-4"
          >
            Skills &{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #14B8A6, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Technologies
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle max-w-xl mx-auto"
          >
            My technical toolkit — constantly growing through real projects and problem solving.
          </motion.p>
        </div>

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: isActive ? tabColors[tab.key] + '15' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? tabColors[tab.key] + '40' : 'rgba(255,255,255,0.08)'}`,
                  color: isActive ? tabColors[tab.key] : '#B0B7C3',
                  boxShadow: isActive ? `0 0 20px ${tabColors[tab.key]}20` : 'none',
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {currentSkills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} category={activeTab} color={currentColor} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Tech logos cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 pt-12"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-center text-xs uppercase tracking-widest mb-8" style={{ color: '#6B7280' }}>
            Technologies I work with
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
              'TypeScript', 'Tailwind CSS', 'Docker', 'Git', 'AWS', 'Python',
              'C++', 'GraphQL', 'Redis', 'Vercel',
            ].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: '#B0B7C3',
                }}
                whileHover={{
                  background: 'rgba(20,184,166,0.06)',
                  borderColor: 'rgba(20,184,166,0.2)',
                  color: '#14B8A6',
                  scale: 1.05,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
