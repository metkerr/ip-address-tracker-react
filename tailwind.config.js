/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "very-dark-gray": "hsl(0, 0%, 17%)",
        "dark-gray": "hsl(0, 0%, 59%)",
      },
      height: {
        76: "19rem",
      },
      letterSpacing: {
        "x-wide": "0.17em",
      },
      fontSize: {
        "2xs": "0.6rem",
        "2.5xl": "1.625rem",
      },
      padding: {
        5.5: "1.32rem",
      },
    },
  },
  plugins: [],
};
