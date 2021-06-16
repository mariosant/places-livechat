const livechatColors = require("@livechat/design-system-colors/dist/design-system-colors.json");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: false,
  theme: {
    textColor: {
      body: "#424d57",
      heading: "#424d57",
      subtle: livechatColors.gray300,
      black: "#000",
      ...livechatColors,
    },
    colors: {
      ...livechatColors,
      black: "#000",
      inherit: "inherit",
      transparent: "transparent",
    },
    fontFamily: {
      sans: ["Source Sans Pro", "sans-serif"],
    },
    borderRadius: {
      DEFAULT: "4px",
      large: "8px",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
