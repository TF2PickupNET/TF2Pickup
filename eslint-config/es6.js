module.exports = {
  env: { es6: true },

  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      generators: false,
      objectLiteralDuplicateProperties: false,
      experimentalObjectRestSpread: true,
    },
  },

  rules: {
    // http://eslint.org/docs/rules/arrow-body-style
    'arrow-body-style': [
      'error',
      'as-needed',
      { requireReturnForObjectLiteral: true },
    ],

    // http://eslint.org/docs/rules/arrow-parens
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],

    // http://eslint.org/docs/rules/arrow-spacing
    'arrow-spacing': ['error', {
      before: true,
      after: true,
    }],

    // http://eslint.org/docs/rules/constructor-super
    'constructor-super': 'error',

    // http://eslint.org/docs/rules/generator-star-spacing
    'generator-star-spacing': ['error', {
      before: false,
      after: true,
    }],

    // http://eslint.org/docs/rules/no-class-assign
    'no-class-assign': 'error',

    // http://eslint.org/docs/rules/no-confusing-arrow
    'no-confusing-arrow': ['error', { allowParens: false }],

    // http://eslint.org/docs/rules/no-const-assign
    'no-const-assign': 'error',

    // http://eslint.org/docs/rules/no-dupe-class-members
    'no-dupe-class-members': 'error',

    // http://eslint.org/docs/rules/no-duplicate-imports
    'no-duplicate-imports': ['error', { includeExports: true }],

    // http://eslint.org/docs/rules/no-new-symbol
    'no-new-symbol': 'error',

    // http://eslint.org/docs/rules/no-restricted-imports
    'no-restricted-imports': 'error',

    // http://eslint.org/docs/rules/no-this-before-super
    'no-this-before-super': 'error',

    // http://eslint.org/docs/rules/no-useless-computed-key
    'no-useless-computed-key': 'error',

    // http://eslint.org/docs/rules/no-useless-constructor
    'no-useless-constructor': 'error',

    // http://eslint.org/docs/rules/no-useless-rename
    'no-useless-rename': ['error', {
      ignoreDestructuring: false,
      ignoreImport: false,
      ignoreExport: false,
    }],

    // http://eslint.org/docs/rules/no-var
    'no-var': 'error',

    // http://eslint.org/docs/rules/object-shorthand
    'object-shorthand': ['error', 'always', {
      avoidQuotes: false,
      ignoreConstructors: false,
    }],

    // http://eslint.org/docs/rules/prefer-arrow-callback
    'prefer-arrow-callback': ['error', {
      allowNamedFunctions: false,
      allowUnboundThis: true,
    }],

    // http://eslint.org/docs/rules/prefer-const
    'prefer-const': ['error', {
      destructuring: 'any',
      ignoreReadBeforeAssign: false,
    }],

    // http://eslint.org/docs/rules/prefer-numeric-literals
    'prefer-numeric-literals': 'error',

    // http://eslint.org/docs/rules/prefer-rest-params
    'prefer-rest-params': 'error',

    // http://eslint.org/docs/rules/prefer-spread
    'prefer-spread': 'error',

    // http://eslint.org/docs/rules/prefer-template
    'prefer-template': 'error',

    // http://eslint.org/docs/rules/require-yield
    'require-yield': 'error',

    // http://eslint.org/docs/rules/rest-spread-spacing
    'rest-spread-spacing': ['error', 'never'],

    // http://eslint.org/docs/rules/sort-imports
    'sort-imports': ['off', {
      ignoreCase: false,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: [
        'none',
        'all',
        'multiple',
        'single',
      ],
    }],

    // http://eslint.org/docs/rules/symbol-description
    'symbol-description': 'error',

    // http://eslint.org/docs/rules/template-curly-spacing
    'template-curly-spacing': ['error', 'never'],

    // http://eslint.org/docs/rules/yield-star-spacing
    'yield-star-spacing': ['error', {
      before: false,
      after: true,
    }],

    // http://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': ['off', {
      array: false,
      object: true,
    }, { enforceForRenamedProperties: true }],
  },
};
