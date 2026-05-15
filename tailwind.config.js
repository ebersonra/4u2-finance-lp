/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0F1117',
          secondary: '#12151C',
          tertiary: '#151820',
        },
        brand: {
          green: '#6EE7B7',
          'green-hover': '#86EFAC',
          'green-muted': '#1D9E75',
          'green-dim': 'rgba(110,231,183,0.12)',
        },
        members: {
          ana: '#F9A8D4',
          'ana-dim': '#D4537E',
          pedro: '#93C5FD',
        },
        finance: {
          income: '#6EE7B7',
          expense: '#F87171',
          warning: '#F59E0B',
        },
        content: {
          primary: '#FFFFFF',
          secondary: 'rgba(255,255,255,0.60)',
          muted: 'rgba(255,255,255,0.35)',
          faint: 'rgba(255,255,255,0.20)',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.07)',
          focus: 'rgba(110,231,183,0.40)',
          error: 'rgba(249,168,212,0.50)',
        },
        category: {
          food: '#F97316',
          home: '#8B5CF6',
          transport: '#3B82F6',
          health: '#10B981',
          leisure: '#F59E0B',
          education: '#EC4899',
          income: '#34D399',
          restaurant: '#EF4444',
          market: '#6366F1',
          personal: '#F43F5E',
          delivery: '#A855F7',
          streaming: '#EC4899',
          other: '#94A3B8',
        },
      },
      fontFamily: {
        heading: ['"Lexend Giga"', 'sans-serif'],
        body: ['"Lexend Deca"', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease both',
        'pulse-dot': 'pulseDot 2s ease infinite',
        'scroll-line': 'scrollLine 1.5s ease infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
    },
  },
  plugins: [],
}
