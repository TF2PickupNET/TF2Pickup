module.exports = {
  settings: {
    // https://github.com/benmosher/eslint-plugin-import#importextensions
    'import/extensions': ['.js'],

    // https://github.com/benmosher/eslint-plugin-import#importignore
    'import/ignore': [],

    // https://github.com/benmosher/eslint-plugin-import#importcore-modules
    'import/core-modules': [],

    // https://github.com/benmosher/eslint-plugin-import#importexternal-module-folders
    'import/external-module-folders': [],

    // https://github.com/benmosher/eslint-plugin-import#importresolver
    'import/resolver': { node: { extensions: ['.js', '.jsx'] } },

    // https://github.com/benmosher/eslint-plugin-import#importcache
    'import/cache': { lifetime: 60 },
  },

  rules: {
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md
    'import/default': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md
    'import/export': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/exports-last.md
    'import/exports-last': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': ['error', 'always', {
      js: 'never',
      jsx: 'never',
    }],

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
    'import/first': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/max-dependencies.md
    'import/max-dependencies': ['off', { max: 0 }],

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md
    'import/named': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md
    'import/namespace': ['error', { allowComputed: true }],

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
    'import/newline-after-import': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
    'import/no-absolute-path': 'off',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-amd.md
    'import/no-amd': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-commonjs.md
    'import/no-commonjs': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-deprecated.md
    'import/no-deprecated': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
    'import/no-duplicates': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
    'import/no-dynamic-require': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/*.spec.js',
        '/tests/**/*',
        '**/stories.jsx',
        '/.storybook/*',
      ],
    }],

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-internal-modules.md
    'import/no-internal-modules': 'off',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
    'import/no-mutable-exports': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
    'import/no-named-as-default-member': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
    'import/no-named-as-default': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-default.md
    'import/no-named-default': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-namespace.md
    'import/no-namespace': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-nodejs-modules.md
    'import/no-nodejs-modules': 'off',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-restricted-paths.md
    'import/no-restricted-paths': 'off',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unassigned-import.md
    'import/no-unassigned-import': 'off',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
    'import/no-unresolved': ['error', { caseSensitive: true }],

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md
    'import/no-webpack-loader-syntax': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    // Waiting for:
    // https://github.com/benmosher/eslint-plugin-import/pull/701#issuecomment-269115958
    'import/order': ['error', {
      groups: [
        ['builtin', 'external', 'internal'],
        'parent',
        ['index', 'sibling'],
      ],
      'newlines-between': 'always',
    }],

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/unambiguous.md
    'import/unambiguous': 'off',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-anonymous-default-export.md
    'import/no-anonymous-default-export': ['error', {
      allowArray: false,
      allowArrowFunction: false,
      allowAnonymousClass: false,
      allowAnonymousFunction: false,
      allowLiteral: false,
      allowObject: true,
    }],
  },
};
