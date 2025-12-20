
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
    './node_modules/@fortawesome/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#01D8FF',
        'brand-secondary-dark': '#1E293B',
        'brand-light-bg': '#F9FAFB',
        'brand-primary-darker': '#00B0D4',
        'brand-primary-text': '#007B88',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}