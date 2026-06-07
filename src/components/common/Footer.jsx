import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { navLinks, socialLinks, personalInfo } from '../../constants';
import myImage from '../../assets/Myimage.png';

const socialIcons = {
  FaGithub: FaGithub,
  FaLinkedin: FaLinkedin,
  FaTwitter: FaTwitter,
  HiMail: HiMail,
};

const Footer = () => {
  const scrollToSection = (href) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative pt-16 pb-8 overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Gradient fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,229,255,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={myImage}
                alt="Logo"
                className="w-10 h-10 rounded-xl object-cover"
                style={{
                  boxShadow: '0 0 20px rgba(0,229,255,0.3)',
                }}
              />
              <div>
                <p className="font-display font-semibold text-white">Vedant Devrani</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>Full Stack Developer</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: '#B0B7C3' }}>
              Building scalable web applications and solving complex problems.
              Available for internship opportunities.
            </p>

            {/* Social links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#B0B7C3',
                    }}
                    whileHover={{
                      background: 'rgba(0,229,255,0.08)',
                      borderColor: 'rgba(0,229,255,0.25)',
                      color: '#00E5FF',
                      scale: 1.1,
                    }}
                    title={social.label}
                  >
                    {Icon && <Icon size={14} />}
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#6B7280' }}>
              Navigation
            </p>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="block text-sm transition-colors duration-200"
                  style={{ color: '#B0B7C3' }}
                  onMouseEnter={(e) => (e.target.style.color = '#00E5FF')}
                  onMouseLeave={(e) => (e.target.style.color = '#B0B7C3')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#6B7280' }}>
              Contact
            </p>
            <div className="space-y-2 text-sm" style={{ color: '#B0B7C3' }}>
              <a
                href={`mailto:${personalInfo.email}`}
                className="block transition-colors duration-200"
                onMouseEnter={(e) => (e.target.style.color = '#00E5FF')}
                onMouseLeave={(e) => (e.target.style.color = '#B0B7C3')}
              >
                {personalInfo.email}
              </a>
              <p>{personalInfo.location}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">Open to opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: '#6B7280' }}
        >
          <p>
            © 2025 Vedant Devrani. Built with ❤️ using React & Three.js.
          </p>
          <div className="flex items-center gap-4">
            <span
              className="px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.12)', color: '#00E5FF' }}
            >
              React 19
            </span>
            <span
              className="px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.12)', color: '#7C3AED' }}
            >
              Three.js
            </span>
            <span
              className="px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(232,121,249,0.06)', border: '1px solid rgba(232,121,249,0.12)', color: '#E879F9' }}
            >
              GSAP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
