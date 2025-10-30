// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './content/**/*.md',
    // Ensure you're scanning for icon classes correctly
    // This regex specifically helps Tailwind identify arbitrary class names including Font Awesome ones
    './node_modules/@fortawesome/**/*.{js,ts}', // If you install Font Awesome packages
  ],
  theme: {
    extend: {
      colors: {
        // Define your new brand colors here
        'brand-primary': '#01D8FF', // The main turquoise-blue from the old site
        'brand-secondary-dark': '#1E293B', // Your existing dark background color for hero/sections
        'brand-light-bg': '#F9FAFB',     // Your existing light background color
        // Add shades for brand-primary for hover/active states
        'brand-primary-darker': '#00B0D4', // A slightly darker shade for hover, e.g. for buttons
        'brand-primary-text': '#007B88',  // A darker shade of the turquoise if needed for text over light bg
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}