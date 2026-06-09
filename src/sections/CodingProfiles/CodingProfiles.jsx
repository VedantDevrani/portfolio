import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaExternalLinkAlt, FaCode, FaTrophy } from 'react-icons/fa';
import { codingProfiles } from '../../constants';
import { useCountUp } from '../../hooks/useCountUp';

// Animated number component using custom hook
const AnimatedNumber = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useCountUp(value, duration, isInView);
  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const PlatformCard = ({ profile, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      className="relative p-6 rounded-2xl group"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${profile.borderColor}`,
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s',
      }}
      whileHover={{
        y: -6,
        borderColor: profile.color + '60',
        boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${profile.color}20`,
        backgroundColor: profile.bgColor,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: profile.color, boxShadow: `0 0 10px ${profile.color}` }}
      />

      {/* Platform name + link */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
            style={{ background: profile.bgColor, border: `1px solid ${profile.borderColor}`, color: profile.color }}
          >
            {profile.platform.slice(0, 2)}
          </div>
          <div>
            <h3 className="font-display font-bold text-white">{profile.platform}</h3>
            <p className="text-xs" style={{ color: '#6B7280' }}>@{profile.username}</p>
          </div>
        </div>
        <a
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg transition-colors"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#B0B7C3',
          }}
        >
          <FaExternalLinkAlt size={12} />
        </a>
      </div>

      {/* Main stats */}
      <div className="flex gap-4 mb-5 p-4 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="text-center flex-1">
          <div className="font-display font-black text-2xl" style={{ color: profile.color }}>
            <AnimatedNumber value={profile.solved} duration={2} />
          </div>
          <div className="text-xs mt-1" style={{ color: '#6B7280' }}>Problems</div>
        </div>
        <div className="w-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="text-center flex-1">
          <div className="font-display font-black text-2xl" style={{ color: profile.color }}>
            {typeof profile.rating === 'number' ? (
              <AnimatedNumber value={profile.rating} duration={2} />
            ) : (
              <span>{profile.rating}</span>
            )}
          </div>
          <div className="text-xs mt-1" style={{ color: '#6B7280' }}>Rating</div>
        </div>
      </div>

      {/* Rank badge */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl mb-4 text-sm font-semibold"
        style={{ background: profile.bgColor, border: `1px solid ${profile.borderColor}`, color: profile.color }}
      >
        <FaTrophy size={12} />
        {profile.rank}
      </div>

      {/* Sub stats */}
      <div className="grid grid-cols-3 gap-2">
        {profile.stats.map((stat) => (
          <div
            key={stat.label}
            className="p-2.5 rounded-xl text-center"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="font-bold text-sm" style={{ color: stat.color }}>
              {typeof stat.value === 'number' ? (
                <AnimatedNumber value={stat.value} duration={2} />
              ) : (
                <span>{stat.value}</span>
              )}
            </div>
            <div className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.a
        href={profile.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full mt-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
        style={{
          background: profile.bgColor,
          border: `1px solid ${profile.borderColor}`,
          color: profile.color,
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaCode size={12} /> View Profile
      </motion.a>
    </motion.div>
  );
};

const CodingProfiles = () => {
  return (
    <section
      id="coding-profiles"
      data-section="coding-profiles"
      className="relative section-padding"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,121,249,0.03) 0%, transparent 70%)',
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
            style={{ background: 'rgba(232,121,249,0.08)', border: '1px solid rgba(232,121,249,0.2)', color: '#4338CA' }}
          >
            Problem Solving
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-white mb-4"
          >
            Coding{' '}
            <span style={{
              backgroundImage: 'linear-gradient(135deg, #4338CA, #8B5CF6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Profiles
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle max-w-xl mx-auto"
          >
            1000+ problems solved across platforms. Strong DSA fundamentals built through consistent practice.
          </motion.p>
        </div>

        {/* Profile cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {codingProfiles.map((profile, i) => (
            <PlatformCard key={profile.platform} profile={profile} index={i} />
          ))}
        </div>

        {/* Total stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 lg:p-8 rounded-2xl text-center"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: '#6B7280' }}>
            Combined Statistics
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            {[
              { label: 'Total Problems', value: 1030, color: '#14B8A6' },
              { label: 'Platforms Active', value: 4, color: '#8B5CF6' },
              { label: 'Average Rating', value: 1218, color: '#4338CA' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-black text-4xl mb-1" style={{ color: stat.color }}>
                  <AnimatedNumber value={stat.value} duration={2.5} />+
                </div>
                <div className="text-sm" style={{ color: '#B0B7C3' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodingProfiles;
