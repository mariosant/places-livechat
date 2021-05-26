const livechatColors = require("@livechat/design-system-colors/dist/design-system-colors.json");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    colors: {
      ...livechatColors,
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
