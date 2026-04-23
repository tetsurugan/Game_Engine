/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "Cambria", "serif"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      colors: {
        parchment: {
          50: "#f7f2e8",
          100: "#efe6d3",
          200: "#dccfb0",
        },
        ink: {
          900: "#0b0a08",
          800: "#17140f",
          700: "#221e17",
          600: "#2e2920",
        },
        vow: {
          kept: "#c9a86a",
          strained: "#d08a3a",
          broken: "#a23b2b",
        },
      },
    },
  },
  plugins: [],
};
