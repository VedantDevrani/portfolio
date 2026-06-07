/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#050816',
          surface: 'rgba(255,255,255,0.05)',
          card: 'rgba(255,255,255,0.03)',
        },
        primary: {
          DEFAULT: '#00E5FF',
          dim: 'rgba(0,229,255,0.15)',
          glow: 'rgba(0,229,255,0.4)',
        },
        secondary: {
          DEFAULT: '#7C3AED',
          dim: 'rgba(124,58,237,0.15)',
          glow: 'rgba(124,58,237,0.4)',
        },
        accent: '#E879F9',
        text: {
          primary: '#FFFFFF',
          secondary: '#B0B7C3',
          muted: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-gradient': 'linear-gradient(135deg, #050816 0%, #0a0f2e 50%, #050816 100%)',
        'primary-gradient': 'linear-gradient(135deg, #00E5FF 0%, #7C3AED 100%)',
        'glow-gradient': 'radial-gradient(ellipse at center, rgba(0,229,255,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(0,229,255,0.3), 0 0 60px rgba(0,229,255,0.1)',
        'glow-secondary': '0 0 20px rgba(124,58,237,0.3), 0 0 60px rgba(124,58,237,0.1)',
        'glow-accent': '0 0 20px rgba(232,121,249,0.3)',
        'glass': '0 8px 32px rgba(0,0,0,0.37)',
        'card': '0 4px 24px rgba(0,0,0,0.5)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'border-flow': 'border-flow 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,229,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0,229,255,0.6), 0 0 80px rgba(0,229,255,0.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      screens: {
        'xs': '475px',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
