module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // Enables dark mode via class
  theme: {
    extend: {
      colors: {
        lightBackground: '#ec4899', // Pink background for light mode
        darkBackground: '#6b21a8',  // Violet background for dark mode
        lightForeground: '#ffffff', // White foreground for light mode
        darkForeground: '#f3e8ff',  // Light violet foreground for dark mode
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        mono: ['monospace'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
