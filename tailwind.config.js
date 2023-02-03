/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      gridTemplateCols: {
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      gridRowStart: {
        '9': '9',
        '10': '10'
       },
      gridRowEnd: {
        '12': '12',
        '13': '13',
       }
    },
  },
  plugins: [],
}
