import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        seagreen: {
          50: '#F0FDFA',
          100: '#E0F2F1',
          200: '#B2DFDB',
          300: '#80CBC4',
          400: '#4DB6AC',
          500: '#20B2AA', // Official Light Sea Green
          600: '#00897B',
          700: '#00796B',
          800: '#00695C',
          900: '#004D40', // Deep Teal
          950: '#00251A',
        },
        deepteal: '#004D40',
        darkslate: '#1E293B',
        cyber: {
          cyan: '#06B6D4',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          emerald: '#10B981',
          rose: '#F43F5E',
          amber: '#F59E0B',
        },
      },
      backgroundImage: {
        'cyber-grid': "radial-gradient(circle, rgba(0, 77, 64, 0.08) 1px, transparent 1px)",
        'glass-gradient': "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.35) 100%)",
        'glow-conic': "conic-gradient(from 180deg at 50% 50%, #20B2AA 0deg, #3B82F6 120deg, #F59E0B 240deg, #20B2AA 360deg)",
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'glow-teal': '0 0 25px -5px rgba(32, 178, 170, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.35)',
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'glass': '0 12px 35px 0 rgba(0, 77, 64, 0.08)',
        'glass-hover': '0 18px 45px 0 rgba(0, 77, 64, 0.14)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
