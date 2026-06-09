import { useState, useEffect, Suspense, lazy, Component } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Loader from './components/loader/Loader';
import CustomCursor from './components/cursor/CustomCursor';
import GlobalThreeBackground from './components/background/GlobalThreeBackground';
import Navbar from './components/navbar/Navbar';
import Footer from './components/common/Footer';

// Sections
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Skills from './sections/Skills/Skills';
import Projects from './sections/Projects/Projects';

import Education from './sections/Education/Education';

import Contact from './sections/Contact/Contact';

// Hooks
import { useLenis } from './hooks/useLenis';
import { useScrollProgress } from './hooks/useScrollProgress';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Error boundary for individual sections
class SectionErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Section error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-12 text-center" style={{ color: '#6B7280' }}>
          <p className="text-sm">Section failed to load</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useLenis();
  const { activeSection } = useScrollProgress();

  useEffect(() => {
    // Secret developer console greeting
    console.log(
      "%cWelcome to my digital workspace! 🚀\n\n%cIf you're reading this, you probably know your way around code.\nI'm always looking for cool projects or opportunities. Let's connect!\n\n%c— Vedant Devrani",
      "color: #14B8A6; font-size: 20px; font-weight: bold; font-family: monospace;",
      "color: #A78BFA; font-size: 14px; font-family: monospace;",
      "color: #8B5CF6; font-size: 14px; font-style: italic; font-family: monospace;"
    );
  }, []);

  const handleLoadComplete = () => {
    setLoading(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  // Update Lenis scroll function for GSAP ScrollTrigger
  useEffect(() => {
    if (!lenisRef.current) return;
    lenisRef.current.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
  }, [lenisRef]);

  return (
    <>
      {/* Loading screen */}
      {loading && <Loader onComplete={handleLoadComplete} />}

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Global 3D background — fixed fullscreen Three.js canvas */}
      <SectionErrorBoundary>
        <GlobalThreeBackground />
      </SectionErrorBoundary>

      {/* Main app */}
      <div
        className="relative min-h-screen"
        style={{
          background: 'transparent',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* Navbar */}
        <Navbar activeSection={activeSection} />

        {/* Page sections — each wrapped in error boundary */}
        <main>
          <SectionErrorBoundary>
            <Hero />
          </SectionErrorBoundary>

          <SectionErrorBoundary>
            <About />
          </SectionErrorBoundary>

          <SectionErrorBoundary>
            <Skills />
          </SectionErrorBoundary>

          <SectionErrorBoundary>
            <Projects />
          </SectionErrorBoundary>



          <SectionErrorBoundary>
            <Education />
          </SectionErrorBoundary>



          <SectionErrorBoundary>
            <Contact />
          </SectionErrorBoundary>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
