/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
    "./*.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#fe7b00',
        primaryDark: '#e66a00',
        darkBg: '#0f172a',
        darkCard: '#1e293b'
      },
      fontFamily: {
        // Variable font ka naam yahan update kiya
        sans: ['"Inter Variable"', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'monospace'], 
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}