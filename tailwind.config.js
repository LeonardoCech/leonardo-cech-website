/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        animation: {
          'pan-left': 'panLeft 20s linear infinite',
        },
        keyframes: {
          panLeft: {
            '0%': { backgroundPosition: '0% center' },
            '100%': { backgroundPosition: '-100% center' },
          },
        },
      },
    },
    plugins: [],
  }
  