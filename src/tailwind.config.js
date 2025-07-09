/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        spotifytheme: {
          "primary": "#1DB954",      // Spotify green
          "secondary": "#191414",    // Spotify dark
          "accent": "#1ED760",
          "neutral": "#2A2E37",
          "base-100": "#121212",
          "base-200": "#181818",
          "base-content": "#FFFFFF",
          "info": "#3ABFF8",
          "success": "#00FF9C",
          "warning": "#FACC15",
          "error": "#F87171",
        },
      },
      "dark", // fallback themes
      "light",
    ],
  },
};