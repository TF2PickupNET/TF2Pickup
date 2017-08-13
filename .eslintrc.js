module.exports = {
  extends: '@tf2-pickup/eslint-config',

  // rules: { 'filenames/match-exported': 'off' },

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
