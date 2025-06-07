/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/**/*.html"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
    screens: {
      "1000px": "1000px",
      "1100px": "1100px",
      "1200px": "1200px",
      "1300px": "1300px",
      "1500px": "1500px",
      "800px": "800px",
      "400px": "400px",
    },
  },
  plugins: [],
};

module.exports = config;
