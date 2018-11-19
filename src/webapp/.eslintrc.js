module.exports = {
  extends: ['henribeck/client'],

  rules: {
    'no-console': 'off',
    'react/destructuring-assignment': 'off',
    'max-lines-per-function': ['error', {
      max: 60,
      skipBlankLines: true,
      skipComments: true,
      IIFEs: false,
    }],
  },
};
