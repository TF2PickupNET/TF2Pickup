module.exports = {
  extends: ['henribeck/client'],

  rules: {
    'no-console': 'off',
    'react/destructuring-assignment': 'off',
  },

  overrides: [{
    files: [
      'views/index.js',
    ],
    rules: {
      'capitalized-comments': 'off',
      'no-inline-comments': 'off',
    },
  }]
};
