/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: {
          primary: "#212529",
          secondary: "#6c757d",
          muted: "#adb5bd",
        },
        success: {
          DEFAULT: "#28a745",
          dark: "#1e7e34",
        },
        danger: {
          DEFAULT: "#dc3545",
          dark: "#c82333",
        },
        warning: {
          DEFAULT: "#ffc107",
          dark: "#e0a800",
        },
      },
    
    },
  },
  plugins: [],
};
