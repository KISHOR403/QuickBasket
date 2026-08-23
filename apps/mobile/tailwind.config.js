/** @type {import('tailwindcss').Config} */
const sharedPreset = require('@quickbasket/config/tailwind');

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [sharedPreset],
  theme: {
    extend: {},
  },
  plugins: [],
};
