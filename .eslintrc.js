module.exports = {
  extends: '@tf2-pickup/eslint-config',

  // rules: { 'filenames/pickup-exported': 'off' },

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
