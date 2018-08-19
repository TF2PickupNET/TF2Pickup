module.exports = {
  extends: [
    'henribeck',
    'henribeck/flow',
    'henribeck/react',
  ],

  overrides: [{
    files: ['src/config/maps.js'],
    rules: { camelcase: 'off' },
  }, {
    files: [
      'src/webapp/*.js',
      'src/webapp/**/*.js',
      'src/server/*.js',
      'src/server/**/*.js',
    ],
    rules: { 'promise/prefer-await-to-callbacks': 'off' },
  }],
};
