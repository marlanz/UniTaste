/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        orange: {
          100: "#EB4F26",
          200: "#FD8200",
        },
        gray: {
          100: "#8F9098",
          200: "#71727A",
        },
        dark: {
          100: "#1F2024",
        },
        white: {
          100: "#FFFFFF",
        },
        error: "#F14141",
        success: "#2F9B65",
      },
      fontFamily: {
        msr: ["Montserrat-Regular", "sans-serif"],
        "msr-bold": ["Montserrat-Bold", "sans-serif"],
        "msr-sbold": ["Montserrat-SemiBold", "sans-serif"],
        "msr-ebold": ["Montserrat-ExtraBold", "sans-serif"],
        "msr-medium": ["Montserrat-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
