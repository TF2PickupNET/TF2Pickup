module.exports = {
  extends: [
    'henribeck',
    'henribeck/react',
    'henribeck/typescript',
  ],

  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'max-lines-per-function': 'off',
  },

  overrides: [{
    files: ['src/config/maps.ts'],
    rules: {
      camelcase: 'off',
      '@typescript-eslint/camelcase': 'off',
    },
  }, {
    files: ['typings/feathers/feathersjs-errors.d.ts'],
    rules: {
      'unicorn/custom-error-definition': 'off',
      'max-classes-per-file': 'off',
    },
  }, {
    files: [
      'src/server/services/*/events/*.ts',
      'src/server/configure-debug.ts',
    ],
    rules: {
      'promise/prefer-await-to-callbacks': 'off',
    },
  }, {
    files: [
      'src/webapp/icons/*.tsx',
    ],
    rules: {
      'max-len': 'off',
    },
  }],
};
