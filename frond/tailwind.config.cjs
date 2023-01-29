module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
      IBMPlex: ["IBM Plex Sans", "sans-serif"],
    },
    extend: {
      screens: {
        mf: "990px",
        lg: { max: "1800px" },
        sm: { max: "600px" },
        xs: { max: "400px" },
        minmd: "1700px",
        minlg: "2100px",
      },
      colors: {
        primary: "#0B65C6",
        secondary: "#EEF1F6",
        tertiary: "#0e1133",

        lightBlue: "#E1F6FE",
        lightPink: "#FDEEDC",
        lightGreen: "#E1FDE2",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};