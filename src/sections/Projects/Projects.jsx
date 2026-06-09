import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { projects } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

// ProjectCard removed as it's no longer used

// Gignest case study
const GignestCaseStudy = () => {
  const gignest = projects[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative rounded-3xl overflow-hidden mb-16 p-6 sm:p-8 lg:p-12 group"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(20,184,166,0.15)',
        backdropFilter: 'blur(20px)',
      }}
      whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(20,184,166,0.15)' }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ backgroundImage: 'linear-gradient(90deg, transparent, #14B8A6, #8B5CF6, transparent)' }}
      />
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ backgroundImage: 'linear-gradient(135deg, #14B8A6, #8B5CF6)' }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{ background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.2)', color: '#14B8A6' }}>
              ⭐ Featured Project
            </div>
            <h3 className="font-display font-black text-4xl text-white mb-1">{gignest.title}</h3>
            <p className="text-lg" style={{ color: '#8B5CF6' }}>{gignest.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={gignest.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
              <FaGithub /> GitHub
            </a>
            <a href={gignest.live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-black"
              style={{ backgroundImage: 'linear-gradient(135deg, #14B8A6, #8B5CF6)' }}>
              <FaExternalLinkAlt size={12} /> Live Demo
            </a>
          </div>
        </div>

        {/* Case study grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'The Problem', icon: '🔴', color: '#4338CA', text: gignest.problem },
            { title: 'The Solution', icon: '🟢', color: '#22C55E', text: gignest.solution },
            { title: 'Key Learnings', icon: '⚡', color: '#F59E0B', text: gignest.learnings }
          ].map((item, index) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
              whileHover={{ y: -5, background: 'rgba(255,255,255,0.05)' }}
              className="p-5 rounded-2xl transition-all duration-300" 
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-sm font-semibold mb-2" style={{ color: item.color }}>{item.icon} {item.title}</div>
              <p className="text-sm leading-relaxed" style={{ color: '#B0B7C3' }}>{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3">✨ Key Features</h4>
          <div className="grid sm:grid-cols-2 gap-2">
            {gignest.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm" style={{ color: '#B0B7C3' }}>
                <span style={{ color: '#14B8A6' }}>→</span> {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div>
          <h4 className="font-semibold text-white mb-3">🛠️ Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {gignest.tech.map((tech, index) => (
              <motion.span 
                key={tech} 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (index * 0.05), type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(20,184,166,0.15)' }}
                className="px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors"
                style={{ background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.2)', color: '#14B8A6' }}>
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  return (
    <section
      id="projects"
      data-section="projects"
      ref={sectionRef}
      className="relative section-padding"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to bottom, transparent 0%, rgba(20,184,166,0.05) 15%, transparent 100%)',
        }}
      />

      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', color: '#8B5CF6' }}
          >
            My Work
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-white mb-4"
          >
            Featured{' '}
            <span style={{
              backgroundImage: 'linear-gradient(135deg, #14B8A6, #8B5CF6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Projects
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle max-w-xl mx-auto"
          >
            Real-world applications built with modern tech stacks and production-grade engineering.
          </motion.p>
        </div>

        {/* Gignest case study */}
        <GignestCaseStudy />

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/vedantdevrani"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#B0B7C3',
            }}
          >
            <FaGithub size={16} /> View All on GitHub <HiArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
