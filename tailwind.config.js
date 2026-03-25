/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',     // 2001 76ers Black
        secondary: '#CE1141',   // 76ers Red
        accent: '#FFD700',      // Gold
        success: '#2ecc71',
        warning: '#f39c12',
        error: '#e74c3c',
        '76ers-black': '#000000',
        '76ers-red': '#CE1141',
        '76ers-gold': '#FFD700',
        '76ers-white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
