// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // You can define custom fonts here if you want to use them
      fontFamily: {
        // 'sans': ['Inter', 'sans-serif'], // Example: If you install Inter font
        // 'display': ['Plus Jakarta Sans', 'sans-serif'], // Example
      },
      colors: {
        // Custom colors if you want to override DaisyUI defaults or add your own
        // For example, a custom primary color that's a bit more vibrant
        // 'primary': '#1DB954', // Spotify green as an example
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    // Choose your preferred themes. 'dark' is essential for your concept.
    // 'synthwave' is also dark and stylish, could be an alternative or source of inspiration.
    // 'forest' is another dark option.
    themes: ["dark", "synthwave", "forest", "dim"], // You can add more themes if you plan to allow users to switch
    darkTheme: "dark", // Ensures 'dark' is the default dark theme
    base: true, // Applies DaisyUI base styles
    styled: true, // Applies DaisyUI component styles
    utils: true, // Adds DaisyUI utility classes
    prefix: "", // DaisyUI components will not have a prefix (e.g., 'btn' instead of 'daisy-btn')
    logs: true, // Shows DaisyUI logs in console
    themeRoot: ":root", // Where the theme class will be applied (usually 'html' or ':root')
  },
  // This is crucial for enabling dark mode via class toggling
  darkMode: "class",
};