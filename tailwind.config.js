module.exports = {
  theme: {
    extend: {
      spacing: {
        72: '18rem',
        80: '20rem',
        88: '22rem',
      },
      screens: {
        'print': { 'raw': 'print' },
        '2xl': '1700px',
      },
      colors: {
        theme: {
          pink: '#f2c2cb',
          gray: '#191919',
        }
      }
    },
  },
  variants: {
    scale: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [],
}
