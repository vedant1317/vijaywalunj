/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary accent — vivid saffron (warm orange). BJP-aligned, energetic.
        saffron: {
          50: '#FEF4E7',
          100: '#FCE3C4',
          200: '#F9C98C',
          300: '#F4AB54',
          400: '#EF9130',
          500: '#E8791A',
          600: '#CE6210',
          700: '#A94C0F',
          800: '#853D12',
          900: '#6E3312',
          DEFAULT: '#E8791A',
        },
        // Neutral "ink" scale — warm charcoal → beige. Contains NO blue.
        // Light end (50–200) = beige surfaces/borders; dark end (700–900) = text & dark sections.
        ink: {
          50: '#F7F3EC',
          100: '#EDE4D6',
          200: '#DBCDB6',
          300: '#BFAC8E',
          400: '#9A8466',
          500: '#6F5D47',
          600: '#4E4031',
          700: '#372C21',
          800: '#241C14',
          900: '#17110B',
          DEFAULT: '#17110B',
        },
        // Warm beige for alternating section backgrounds and soft surfaces.
        sand: {
          50: '#FBF7F0',
          100: '#F4ECDD',
          200: '#EADCC4',
          300: '#DECAA6',
          400: '#CBB185',
          500: '#B08E57',
          DEFAULT: '#F4ECDD',
        },
        // Off-whites for the page canvas.
        cream: {
          DEFAULT: '#FBF7F0',
          dark: '#F1E7D6',
          light: '#FFFDF9',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        heading: ['Cinzel', 'Georgia', 'serif'],
      },
      keyframes: {
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
