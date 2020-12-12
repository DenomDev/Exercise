const production = !process.env.ROLLUP_WATCH;
module.exports = {
  purge: {
    content: [
      "./src/**/*.svelte",
      "./public/**/*.html",
      "./src/**/*.js"
    ],
    css: ["./public/**/*.css"],
    enabled: production // disable purge in dev
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
