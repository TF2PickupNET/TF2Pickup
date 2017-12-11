module.exports = {
  extends: '@tf2-pickup/eslint-config',

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
