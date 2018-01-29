module.exports = {
  rules: {
    // http://eslint.org/docs/rules/init-declarations
    'init-declarations': ['error', 'always'],

    // http://eslint.org/docs/rules/no-catch-shadow
    'no-catch-shadow': 'error',

    // http://eslint.org/docs/rules/no-delete-var
    'no-delete-var': 'error',

    // http://eslint.org/docs/rules/no-label-var
    'no-label-var': 'error',

    // http://eslint.org/docs/rules/no-restricted-globals
    'no-restricted-globals': ['error', 'Meteor'],

    // http://eslint.org/docs/rules/no-shadow-restricted-names
    'no-shadow-restricted-names': 'error',

    // http://eslint.org/docs/rules/no-shadow
    'no-shadow': ['error', {
      builtinGlobals: false,
      hoist: 'all',
      allow: [],
    }],

    // http://eslint.org/docs/rules/no-undef-init
    'no-undef-init': 'error',

    // http://eslint.org/docs/rules/no-undef
    'no-undef': ['error', { typeof: true }],

    //  http://eslint.org/docs/rules/no-undefined
    'no-undefined': 'error',

    // http://eslint.org/docs/rules/no-unused-vars
    'no-unused-vars': ['error', {
      vars: 'all',
      args: 'after-used',
      caughtErrors: 'all',
    }],

    // http://eslint.org/docs/rules/no-use-before-define
    'no-use-before-define': ['error', {
      functions: true,
      classes: true,
    }],
  },
};
