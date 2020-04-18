module.exports = {
  theme: {
    extend: {
      borderRadius: {
        xl: '1rem',
      },
      height: {
        "1/4": "25%",
        "1/2": "50%",
        "2/4": "50%",
        "3/4": "75%",
      },
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
