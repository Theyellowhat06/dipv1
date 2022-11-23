/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./comps/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {transform: 'rotate(-5deg)'},
          '50%': {transform: 'rotate(5deg)'}  
        }
      },
      animation:{
        wiggle: 'wiggle 1s ease-in-out infinite'
      },

      colors: {
        primary: '#36a7af',
        secondary: '#5677ad',
        backgray: '#F0F3F8',
      },
      
      fontFamily:{
        body: ['Roboto Condensed']
      }
    },
    
  },
  plugins: [],
}
