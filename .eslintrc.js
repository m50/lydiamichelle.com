module.exports = {
  env: {
    jest: true,
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-first-prop-new-line': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-max-props-per-line': 'off',
    'import/no-named-as-default': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/*.test.*', './lib/node-only/*'],
      optionalDependencies: false,
      peerDependencies: false,
    }],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'import/no-unresolved': 'error',
    'no-multiple-empty-lines': ['error', {
      max: 1,
      maxEOF: 1,
    }],
    'import/extensions': ['error', {
      svg: 'always',
      json: 'always',
      js: 'never',
      ts: 'never',
      tsx: 'never',
      jsx: 'never',
    }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
