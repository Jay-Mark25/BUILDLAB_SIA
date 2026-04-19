/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'buildlab-dark': '#0a0f1e',
        'buildlab-card': '#161b2c',
        'buildlab-yellow': '#ffb400',
      }
    },
  },
  plugins: [],
}