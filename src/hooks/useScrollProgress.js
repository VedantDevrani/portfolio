import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const prog = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(1, Math.max(0, prog)));

      // Bullet-proof active section calculation
      const sections = document.querySelectorAll('[data-section]');
      let currentSection = 'hero'; // default
      
      // Use a target line that is 1/3 down from the top of the viewport
      const scrollTarget = scrollTop + window.innerHeight / 3;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        // If our target line is within the section bounds, it's active!
        if (scrollTarget >= top && scrollTarget < top + height) {
          currentSection = section.dataset.section;
        }
      });
      
      // If we are at the absolute bottom of the page, force the last section to be active
      // This handles short final sections (like Contact or Footer)
      if (scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 50) {
        if (sections.length > 0) {
          currentSection = sections[sections.length - 1].dataset.section;
        }
      }

      setActiveSection(currentSection);
    };

    // Run once on mount
    updateProgress();

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return { progress, activeSection };
};
