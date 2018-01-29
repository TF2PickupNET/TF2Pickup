module.exports = {
  parser: 'babel-eslint',

  extends: [
    './eslint-config/ava.js',
    './eslint-config/errors.js',
    './eslint-config/es6.js',
    './eslint-config/filenames.js',
    './eslint-config/import.js',
    './eslint-config/react-jsdoc.js',
    './eslint-config/react.js',
    './eslint-config/node.js',
    './eslint-config/variables.js',
    './eslint-config/best-practices.js',
    './eslint-config/jsx-a11y.js',
    './eslint-config/stylistic-issues.js',
    './eslint-config/promise.js',
  ],

  plugins: [
    'react',
    'import',
    'jsx-a11y',
    'react-jsdoc',
    'filenames',
    'ava',
    'promise',
  ],

  env: {
    browser: true,
    node: true,
  },

  rules: { strict: ['error', 'never'] },

  settings: {
    'react-jsdoc': {
      customTypes: [
        'JSX',
        'Promise',
        'Date'
      ],
    },
  }
};
