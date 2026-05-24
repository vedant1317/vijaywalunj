/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#FF6B00',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          DEFAULT: '#FF6B00',
        },
        navy: {
          50: '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d7fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#4f46e5',
          600: '#3730a3',
          700: '#1e3a8a',
          800: '#1a237e',
          900: '#14175c',
          DEFAULT: '#1a237e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(135deg, #1a237e 0%, #0d1b4b 60%, #1a237e 100%)",
      },
    },
  },
  plugins: [],
};
