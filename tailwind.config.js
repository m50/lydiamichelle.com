module.exports = {
  theme: {
    extend: {
      screens: {
        'print': { 'raw': 'print' },
        '2xl': '1700px',
      }
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    fontFamily: {
      sans: [
        "Raleway", "Noto Sans", 'Roboto', "Helvetica Neue", "Segoe UI",
        'Arial', "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", 'sans-serif'
      ],
      serif: [
        'Georgia', 'Cambria', "Times New Roman", 'Times', 'serif'
      ],
      mono: [
        'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'
      ],
      welcome: [
        'Kalam'
      ],
    },
  },
  variants: {},
  plugins: [],
}
