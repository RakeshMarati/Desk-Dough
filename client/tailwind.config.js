/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Café-themed color palette
        coffee: {
          50: '#faf7f4',
          100: '#f5ede4',
          200: '#e8d4c0',
          300: '#d9b896',
          400: '#c8966b',
          500: '#b87a4a',
          600: '#a9683e',
          700: '#8b5335',
          800: '#724530',
          900: '#5e3b2a',
        },
        cream: {
          50: '#fffefb',
          100: '#fffbf0',
          200: '#fff5d9',
          300: '#ffebc1',
          400: '#ffd89e',
          500: '#ffc77d',
          600: '#ffb84d',
          700: '#ff9f1c',
          800: '#e67e00',
          900: '#cc6600',
        },
      },
    },
  },
  plugins: [],
}

