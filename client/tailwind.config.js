
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        background: '#24292f',
        surface: '#2d333b',
        elevated: '#373e47',
        primary: '#e7eaed',
        body: '#c0c5cb',
        muted: '#8f959c',
        subtle: '#5c6269',
        accent: {
          gold: '#e3b341',
          blue: '#539bf5',
          goldHover: '#cfa236',
          blueHover: '#4483d4'
        },
        status: {
          success: '#57ab5a',
          error: '#e5534b',
          warning: '#c69026'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
