// ─── Design Tokens ────────────────────────────────────────────────────────────
// Mirrors the mobile app's src/theme/index.ts.
// Web landing page uses the same token vocabulary for visual consistency.
// All Tailwind classes reference these via tailwind.config.js.

export const colors = {
  bg: {
    primary: '#0F1117',
    secondary: '#12151C',
    tertiary: '#151820',
    card: 'rgba(255,255,255,0.04)',
    cardBorder: 'rgba(255,255,255,0.07)',
    overlay: 'rgba(10,12,18,0.97)',
  },
  brand: {
    green: '#6EE7B7',
    greenHover: '#86EFAC',
    greenMuted: 'rgba(110,231,183,0.12)',
    greenDim: '#1D9E75',
  },
  members: {
    ana: '#F9A8D4',
    anaDim: '#D4537E',
    pedro: '#93C5FD',
  },
  finance: {
    income: '#6EE7B7',
    expense: '#F87171',
    warning: '#F59E0B',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255,255,255,0.60)',
    muted: 'rgba(255,255,255,0.35)',
    faint: 'rgba(255,255,255,0.20)',
  },
  category: {
    food: '#F97316',
    home: '#8B5CF6',
    transport: '#3B82F6',
    health: '#10B981',
    leisure: '#F59E0B',
    education: '#EC4899',
  },
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
} as const

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  pill: 999,
} as const

export const typography = {
  heading: '"Lexend Giga", sans-serif',
  body: '"Lexend Deca", sans-serif',
} as const
