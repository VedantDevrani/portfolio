import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiMail, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { socialLinks, personalInfo } from '../../constants';

const inputClasses = `
  w-full px-4 py-3.5 rounded-xl text-sm font-medium text-white outline-none
  transition-all duration-300 bg-white/[0.04] border border-white/[0.08]
  focus:bg-white/[0.06] focus:border-[rgba(20,184,166,0.3)]
  placeholder:text-[#6B7280]
`;

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'sending', 'success', 'error'
  const formRef = useRef(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Message is too short';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('sending');

    // Simulate form submission
    await new Promise((res) => setTimeout(res, 2000));
    setStatus('success');
    setForm({ name: '', email: '', message: '' });

    setTimeout(() => setStatus(null), 5000);
  };

  const socialIcons = {
    FaGithub: FaGithub,
    FaLinkedin: FaLinkedin,
    FaTwitter: FaTwitter,
    HiMail: HiMail,
  };

  return (
    <section
      id="contact"
      data-section="contact"
      className="relative section-padding"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to bottom, transparent 0%, rgba(139,92,246,0.05) 100%)',
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
            style={{ background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.2)', color: '#14B8A6' }}
          >
            Get In Touch
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-white mb-4"
          >
            Let's{' '}
            <span style={{
              backgroundImage: 'linear-gradient(135deg, #14B8A6, #8B5CF6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Connect
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle max-w-xl mx-auto"
          >
            Have an internship opportunity? A project idea? Or just want to say hi?
            I'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Contact info cards */}
            <div className="space-y-4 mb-8">
              {[
                {
                  icon: '📧',
                  label: 'Email',
                  value: personalInfo.email,
                  href: `mailto:${personalInfo.email}`,
                  color: '#14B8A6',
                },
                {
                  icon: '📍',
                  label: 'Location',
                  value: 'India',
                  href: null,
                  color: '#8B5CF6',
                },
                {
                  icon: '💼',
                  label: 'Open to',
                  value: 'SWE Internships & Collaborations',
                  href: null,
                  color: '#4338CA',
                },
              ].map((info, index) => (
                <motion.div
                  key={info.label}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: info.color + '12', border: `1px solid ${info.color}20` }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: '#6B7280' }}>{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm font-medium text-white hover:text-primary transition-colors"
                        style={{ '--tw-text-opacity': 1 }}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-white">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#6B7280' }}>
                Find me online
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-sm transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#B0B7C3',
                      }}
                      whileHover={{
                        scale: 1.1,
                        background: 'rgba(20,184,166,0.08)',
                        borderColor: 'rgba(20,184,166,0.3)',
                        color: '#14B8A6',
                        boxShadow: '0 0 20px rgba(20,184,166,0.2)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      title={social.label}
                    >
                      {Icon && <Icon size={16} />}
                    </motion.a>
                  );
                })}
              </div>
            </div>


          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <h3 className="font-display font-semibold text-xl text-white mb-6">
                Send me a message
              </h3>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-xs font-semibold mb-2" style={{ color: '#B0B7C3' }}>
                  Your Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 20px rgba(20,184,166,0.2)' }}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Vedant Devrani"
                  className={inputClasses}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${errors.name ? '#4338CA' : 'rgba(255,255,255,0.08)'}`,
                    color: '#fff',
                  }}
                />
                {errors.name && (
                  <p className="text-xs mt-1" style={{ color: '#4338CA' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-xs font-semibold mb-2" style={{ color: '#B0B7C3' }}>
                  Email Address
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 20px rgba(20,184,166,0.2)' }}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClasses}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${errors.email ? '#4338CA' : 'rgba(255,255,255,0.08)'}`,
                    color: '#fff',
                  }}
                />
                {errors.email && (
                  <p className="text-xs mt-1" style={{ color: '#4338CA' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-xs font-semibold mb-2" style={{ color: '#B0B7C3' }}>
                  Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 20px rgba(20,184,166,0.2)' }}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="I'd like to discuss an internship opportunity..."
                  className={inputClasses}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${errors.message ? '#4338CA' : 'rgba(255,255,255,0.08)'}`,
                    color: '#fff',
                    resize: 'none',
                  }}
                />
                {errors.message && (
                  <p className="text-xs mt-1" style={{ color: '#4338CA' }}>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-black transition-all duration-300"
                style={{
                  background: status === 'success'
                    ? 'linear-gradient(135deg, #22C55E, #16A34A)'
                    : 'linear-gradient(135deg, #14B8A6, #8B5CF6)',
                  opacity: status === 'sending' ? 0.7 : 1,
                }}
                whileHover={status !== 'sending' ? { scale: 1.02, boxShadow: '0 0 30px rgba(20,184,166,0.4)' } : {}}
                whileTap={{ scale: 0.98 }}
              >
                {status === 'sending'
                  ? 'Sending...'
                  : status === 'success'
                  ? '✓ Message Sent!'
                  : 'Send Message →'}
              </motion.button>

              {/* Status messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 mt-4 text-sm"
                    style={{ color: '#22C55E' }}
                  >
                    <HiCheckCircle size={16} />
                    Message received! I'll reply within 24 hours.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
