/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        white: ['0 0px 5px rgba(255,255, 255, 1)', '0 0px 20px rgba(255, 255,255, 1)'],
        blue: ['0 0px 5px rgba(50, 100, 247, 1)', '0 0px 20px rgba(0, 162, 247, 1)'],
        red: ['0 0px 5px rgba(255, 0,0, 1)', '0 0px 20px rgba(255, 0,0, 1)'],
        orange: ['0 0px 5px rgba(255, 100,0, 1)', '0 0px 20px rgba(255, 100,0, 1)'],
        green: ['0 0px 5px rgba(0, 255,220, 1)', '0 0px 20px rgba(0, 255,220, 1)'],
        purple: ['0 0px 5px rgba(255, 0,255, 1)', '0 0px 20px rgba(255, 0,255, 1)'],
        cyan: ['0 0px 5px rgba(100, 200, 255, 1)', '0 0px 20px rgba(0, 150, 255, 1)'],
        black: ['0 0px 0.1px rgba(0,0,0,1)', '0 0px 1px rgba(0,0,0,1)']
      },
      text: {
        glow: ['text-blue-50 drop-shadow-cyan']
      }
    }
  },
  plugins: []
});
