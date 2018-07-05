module.exports = {
  extends: [
    'henribeck/react',
    'henribeck/client',
  ],

  overrides: [{
    files: '*.js',
    env: { node: true },
  }],
};
