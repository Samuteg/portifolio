/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'var(--accent)',
          light: '#d67c7c',
          dark: '#8e3333',
          text: 'var(--accent-text)',
          wash: 'var(--accent-wash)',
          50: '#fdf2f2',
          100: '#fce4e4',
          200: '#fbd0d0',
          300: '#f5a3a3',
          400: '#d67c7c',
          500: '#b74b4b',
          600: '#9e3a3a',
          700: '#8e3333',
          800: '#6d2828',
          900: '#5a2424',
        },
        ink: {
          DEFAULT: 'var(--text-1)',
          soft: 'var(--text-2)',
          mute: 'var(--text-3)',
        },
        canvas: 'var(--background)',
        card: 'var(--surface-1)',
        card2: 'var(--surface-2)',
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)',
        },
        success: 'var(--success)',
        scrim: 'var(--scrim)',
        wash: 'var(--state-wash)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
