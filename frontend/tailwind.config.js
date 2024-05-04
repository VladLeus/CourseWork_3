/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "madder": "#A31621",
        "rojo": "#DB222A",
        "raisin-black": "#1e1a1d",
        "light-green": "#61e294",
        "cream": "#e7efc5"
      },
      fontFamily: {
        "custom": ['Sedgwick Ave Display', 'sans-serif']
      }
    },
  },
  plugins: [],
}
