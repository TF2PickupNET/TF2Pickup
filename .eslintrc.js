module.exports = {
  extends: [
    'henribeck',
    'henribeck/flow',
    'henribeck/react',
  ],

  overrides: [{
    files: ['src/config/maps.js'],
    rules: { camelcase: 'off' },
  }],
};
