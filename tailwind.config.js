/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#faf8f7",
        dark: '#1a202c',
        text: '#000',

        darktheme: {
          primary: '#1a202c',
          secondary: '#2d3748',
          text: '#f7fafc',
          background: '#2d3748',
        }
      }
    },
  },
  plugins: [],
};


