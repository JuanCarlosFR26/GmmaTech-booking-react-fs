/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('../src/assets/3px-tile.png')"
      },
      backgroundColor: {
        reservations: 'rgba(255, 255, 255, 0.3)',
        userReservation: 'rgba(40, 40, 40, 0.7)'
      }
    },
  },
  plugins: [],
}