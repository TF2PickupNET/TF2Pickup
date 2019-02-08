module.exports = {
  extends: [
    'henribeck',
    'henribeck/react',
    'henribeck/typescript',
  ],

  rules: {
    'import/no-unresolved': 'off',
  },

  overrides: [{
    files: ['src/config/maps.ts'],
    rules: {
      camelcase: 'off',
      'typescript/camelcase': 'off',
    },
  }, {
    files: ['typings/feathers/feathersjs-errors.d.ts'],
    rules: {
      'unicorn/custom-error-definition': 'off',
      'max-classes-per-file': 'off',
    },
  }],
};
