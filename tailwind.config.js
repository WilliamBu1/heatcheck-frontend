/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme'); // Import defaultTheme

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        karla: ['Karla', ...defaultTheme.fontFamily.sans],
        michroma: ['Michroma', ...defaultTheme.fontFamily.mono], // Assuming Michroma might pair well with mono stack
      },
    },
  },
  plugins: [],
}
