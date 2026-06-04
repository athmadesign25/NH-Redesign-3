/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // NH Scandinavian palette
        'nh-teal': {
          50:  '#f0fafa',
          100: '#cceeee',
          200: '#99dddd',
          300: '#66cccc',
          400: '#33bbba',
          500: '#1a8f8e',
          600: '#1a6b6b',
          700: '#145555',
          800: '#0e3f3f',
          900: '#082a2a',
        },
        'nh-slate': {
          50:  '#f1f4f9',
          100: '#d8e2f0',
          200: '#b1c4e1',
          300: '#8aa7d2',
          400: '#6389c3',
          500: '#3d6bb4',
          600: '#2d4a7a',
          700: '#243b61',
          800: '#1a2c48',
          900: '#111d30',
        },
        'nh-wood': {
          50:  '#fdf8f3',
          100: '#f5e8d5',
          200: '#e8c99a',
          300: '#d4a464',
          400: '#b8843a',
          500: '#9a6820',
          600: '#7d5318',
          700: '#5f3f12',
          800: '#422c0c',
          900: '#241806',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%':       { transform: 'scale(1.08)', opacity: '0.3' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-6px)' },
        },
        'scan-line': {
          '0%':   { top: '0%' },
          '100%': { top: '100%' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.7s ease forwards',
        'pulse-ring': 'pulse-ring 2.4s ease-in-out infinite',
        'float-y':    'float-y 3.5s ease-in-out infinite',
        'scan-line':  'scan-line 3s linear infinite',
      },
    },
  },
  plugins: [],
};
