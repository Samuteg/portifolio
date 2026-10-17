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
          light: '#ffb43c',
          dark: '#d98a06',
          text: 'var(--accent-text)',
          wash: 'var(--accent-wash)',
          ink: 'var(--accent-ink)',
          50: '#fdf6e7',
          100: '#f9ecc8',
          200: '#f2d795',
          300: '#eabf5c',
          400: '#ffb43c',
          500: '#fca311',
          600: '#d98a06',
          700: '#b06f05',
          800: '#8a5604',
          900: '#6b4203',
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
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
