/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FDF7EB',
          100: '#FAEACA',
          200: '#F4D295',
          300: '#EBB457',
          400: '#E29729',
          500: '#D77A12',
          600: '#C05F08',
          700: '#9F4308',
          800: '#83340D',
          900: '#692B0F',
          DEFAULT: '#C05F08',
        },
        navy: {
          50: '#EBEFF3',
          100: '#D1DBE4',
          200: '#A4B8CD',
          300: '#7192B2',
          400: '#4A7196',
          500: '#305477',
          600: '#233F5E',
          700: '#1D304A',
          800: '#172235',
          900: '#101622',
          DEFAULT: '#101622',
        },
        cream: {
          DEFAULT: '#F8F6F1',
          dark: '#EBE6DA',
          light: '#FCFBFA',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        heading: ['Cinzel', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
