const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        instagram: '#BC2A8D',
        youtube: '#BB0000',
        facebook: '#3B5998',
        tiktok: '#010101',
      },
      backgroundImage: {
        'home': "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/assets/pages/home/background.webp')",
        'place': "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/assets/pages/places/background.webp')",
        'about': "url('/assets/pages/about/background.webp')",
        'peniel': "url('/assets/pages/peniel/background.webp')",
        'events': "url('/assets/pages/events/background.webp')",
        'ministries': "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/assets/pages/ministries/background.webp')"
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
    require("tailwindcss-inner-border"),
    require("flowbite/plugin"),
  ],
}
