import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '../../constants';
import { useCountUp } from '../../hooks/useCountUp';

const AchievementCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCountUp(item.value, 2.5, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      className="relative p-8 rounded-2xl text-center overflow-hidden group"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
      }}
      whileHover={{
        y: -8,
        borderColor: item.color + '40',
        boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${item.color}15`,
      }}
    >
      {/* Top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ backgroundImage: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
      />

      {/* Glow bg */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
        style={{ background: item.color, borderRadius: '50%' }}
      />

      {/* Icon */}
      <div
        className="text-4xl mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl"
        style={{
          background: item.color + '12',
          border: `1px solid ${item.color}20`,
          boxShadow: `0 0 20px ${item.color}10`,
        }}
      >
        {item.icon}
      </div>

      {/* Counter */}
      <div
        className="font-display font-black text-5xl mb-2"
        style={{ color: item.color, textShadow: `0 0 20px ${item.color}40` }}
      >
        {count}{item.suffix}
      </div>

      {/* Label */}
      <p className="font-medium text-base" style={{ color: '#B0B7C3' }}>
        {item.label}
      </p>
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <section
      id="achievements"
      data-section="achievements"
      className="relative section-padding"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)',
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
            style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', color: '#F59E0B' }}
          >
            By the Numbers
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-white mb-4"
          >
            Achievements &{' '}
            <span style={{
              backgroundImage: 'linear-gradient(135deg, #F59E0B, #4338CA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Stats
            </span>
          </motion.h2>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {achievements.map((item, i) => (
            <AchievementCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
