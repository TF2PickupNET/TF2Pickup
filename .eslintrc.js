module.exports = {
  extends: [
    'henribeck',
    'henribeck/react',
    'henribeck/typescript',
  ],

  overrides: [{
    files: ['src/config/maps.ts'],
    rules: { camelcase: 'off' },
  }],
};
