/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
      fontFamily: {
        Nunito: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#29426E",
        secondary: "#fbf7f4",
        "primary-dark": "#0c4e98",
        "primary-light": "#1d75b7",
        "paragraph-color": "#000000",
        "dark-gray": "#2d3748",
        "paragraph-normal": "#000000",
        dark: "#000000",
        light: "#FFFFFF",
        "bg-white": "#FFFFFF",
        "active-green": "#8CA732",
        red: "#FF0000",
      },
    },
    screens: {
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",

      "1920Screen": "1920px",
    },
  },
  plugins: [],
};
