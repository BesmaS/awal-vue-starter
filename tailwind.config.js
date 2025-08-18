/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        zain: ['Zain', 'sans-serif'], // 👈 ajoute ici
      },
      fontWeight: {
        bold: '700',
        extralight: '200', // 👈 pour Zain Extra Light
      },
      colors: {
        beige: '#F4ECD8',
        dark: '#1a1a1a',
      }
    },
  },
  plugins: [],
}
