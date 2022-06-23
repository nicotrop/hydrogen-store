module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{css,scss,sass,less,styl}",
    "./src/routes/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
