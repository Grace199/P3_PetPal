/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'desktop': '250px',
        'tablet': '50px',
        'mobile': '20px',
      },
      colors: {
        'primary': '#5A81E2',
        'secondary': '#B5C7F2',
        'accent': {
          '100': '#214CBA',
          '200': '#5072c7'
        },
        'background': '#F2F5FD',
        'text': '#030711',
        'background-secondary': '#E6E9F0',
        'gray': '#A4A4A4',
        'white': '#FAFAFA',
        'light-gray':'#c7c7c7Af',
      }
    },
  },
  plugins: [],
}

