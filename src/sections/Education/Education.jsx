import { useRef } from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiBookOpen } from 'react-icons/hi';
import { education } from '../../constants';

const TimelineItem = ({ item, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className="flex gap-6 lg:gap-0 items-start">
      {/* Left content (desktop even items) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.7, delay: index * 0.2 }}
        className="flex-1 lg:flex-none lg:w-5/12"
      >
        <div
          className="p-6 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2"
                style={{
                  background: item.current ? 'rgba(0,229,255,0.08)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${item.current ? 'rgba(0,229,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
                  color: item.current ? '#00E5FF' : '#6B7280',
                }}
              >
                {item.year}
              </span>
              {item.current && (
                <span className="ml-2 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                  style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Current
                </span>
              )}
              <h3 className="font-display font-bold text-white text-lg leading-tight mt-1">{item.degree}</h3>
              <p className="text-sm mt-0.5" style={{ color: '#7C3AED' }}>{item.major}</p>
              <p className="text-sm mt-0.5" style={{ color: '#B0B7C3' }}>{item.institution}</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex gap-3 mb-4">
            {item.cgpa && (
              <div className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)', color: '#00E5FF' }}>
                CGPA: {item.cgpa}/10
              </div>
            )}
            {item.percentage && (
              <div className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)', color: '#00E5FF' }}>
                {item.percentage}
              </div>
            )}
            {item.year_num && (
              <div className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)', color: '#7C3AED' }}>
                {item.year_num}
              </div>
            )}
          </div>

          {/* Courses */}
          {item.courses && (
            <div>
              <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold" style={{ color: '#B0B7C3' }}>
                <HiBookOpen size={12} /> Relevant Coursework
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.courses.map((course) => (
                  <span key={course} className="px-2 py-1 rounded-md text-xs"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: '#B0B7C3' }}>
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {item.highlights && item.highlights.length > 0 && (
            <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {item.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 text-xs mt-1.5" style={{ color: '#B0B7C3' }}>
                  <span style={{ color: '#00E5FF' }}>✓</span> {h}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Timeline connector (desktop) */}
      <div className="hidden lg:flex w-2/12 flex-col items-center">
        <motion.div
          initial={{ scale: 0, boxShadow: '0 0 0px rgba(0,229,255,0)' }}
          whileInView={{ 
            scale: [0, 1.2, 1],
            boxShadow: ['0 0 0px rgba(0,229,255,0)', '0 0 50px rgba(0,229,255,1)', '0 0 20px rgba(0,229,255,0.5)']
          }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
          className="w-10 h-10 rounded-full flex items-center justify-center z-10 relative animate-[pulse_3s_ease-in-out_infinite]"
          style={{
            background: 'linear-gradient(135deg, #00E5FF, #7C3AED)',
          }}
        >
          <HiAcademicCap size={18} className="text-white" />
        </motion.div>
      </div>

      {/* Right (empty for even, content for odd) */}
      <div className="hidden lg:block flex-1 lg:w-5/12" />
    </div>
  );
};

const Education = () => {
  return (
    <section
      id="education"
      data-section="education"
      className="relative section-padding"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(124,58,237,0.02) 50%, transparent 100%)',
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
            style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', color: '#00E5FF' }}
          >
            Academic Journey
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-white mb-4"
          >
            Education &{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00E5FF, #7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Learning
            </span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, #00E5FF44, #7C3AED44, transparent)' }}
          />

          <div className="space-y-10">
            {education.map((item, i) => (
              <TimelineItem key={item.degree} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
