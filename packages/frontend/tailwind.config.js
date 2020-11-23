module.exports = {
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  purge: {
    enabled: process.argv.includes("build"),
    content: ["./index.html", "./src/**/*.vue"],
  },
};
