/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Crypto Waffle brand colors from the proposal
        'dark-grey': '#4E555E',
        'mid-grey': '#80858B',
        'teal': '#43C4CC',
        'yellow': '#FFD878',
        'almost-black': '#2A2B2D',
        'light-grey': '#CDD6DF',
      },
      fontFamily: {
        'fredoka': ['Fredoka', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 