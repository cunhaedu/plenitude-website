const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home': "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/assets/pages/home/background.jpg')",
        'place': "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/assets/pages/places/background.jpg')",
        'about': "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/assets/pages/about/background.jpg')",
        'ministries': "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/assets/pages/ministries/background.jpg')",
        'leadership-main-couple': "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/assets/leadership/churches/main.png')",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp'),
    require("tailwindcss-hyphens"),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
