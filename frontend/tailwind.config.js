const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      ...colors,
      main: {
        50: '#f0f3fe',
        100: '#dde3fc',
        200: '#c2cefb',
        300: '#98aff8',
        400: '#6886f2',
        500: '#3651eb',
        600: '#2f3ee1',
        700: '#272dce',
        800: '#2526a8',
        900: '#242784',
        950: '#1a1a51'
      }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    },
    extend: {}
  },
  plugins: []
}
