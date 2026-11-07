/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF6',
          100: '#FAF5EA',
          200: '#F2E8D3',
          300: '#E6D6B6',
        },
        charcoal: {
          DEFAULT: '#1E1B18',
          800: '#2A2622',
          700: '#3A352F',
          600: '#5A534A',
          500: '#7A7267',
        },
        gold: {
          300: '#E2C98A',
          400: '#D3B068',
          500: '#C19A4B',
          600: '#A37F34',
          700: '#7F6126',
        },
        spice: '#9B3B1E',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(30,27,24,.04), 0 12px 32px -12px rgba(30,27,24,.18)',
        lift: '0 2px 4px rgba(30,27,24,.06), 0 24px 48px -16px rgba(30,27,24,.28)',
      },
    },
  },
  plugins: [],
}
