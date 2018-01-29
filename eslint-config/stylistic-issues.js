module.exports = {
  rules: {
    // http://eslint.org/docs/rules/array-bracket-newline
    'array-bracket-newline': 'off',

    // http://eslint.org/docs/rules/array-bracket-spacing
    'array-bracket-spacing': 'off',

    // http://eslint.org/docs/rules/array-element-newline
    'array-element-newline': 'off',

    // http://eslint.org/docs/rules/block-spacing
    'block-spacing': ['error', 'always'],

    // http://eslint.org/docs/rules/brace-style
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],

    // http://eslint.org/docs/rules/camelcase
    camelcase: ['error', { properties: 'always' }],

    // http://eslint.org/docs/rules/capitalized-comments
    'capitalized-comments': ['error', 'always', {
      ignoreInlineComments: false,
      ignoreConsecutiveComments: true,
    }],

    // http://eslint.org/docs/rules/comma-dangle
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],

    // http://eslint.org/docs/rules/comma-spacing
    'comma-spacing': ['error', {
      before: false,
      after: true,
    }],

    // http://eslint.org/docs/rules/comma-style
    'comma-style': ['error', 'last'],

    // http://eslint.org/docs/rules/computed-property-spacing
    'computed-property-spacing': ['error', 'never'],

    // http://eslint.org/docs/rules/consistent-this
    'consistent-this': ['error', 'that'],

    // http://eslint.org/docs/rules/eol-last
    'eol-last': ['error', 'always'],

    // http://eslint.org/docs/rules/func-call-spacing
    'func-call-spacing': ['error', 'never'],

    // http://eslint.org/docs/rules/func-name-matching
    'func-name-matching': ['error', 'always'],

    // http://eslint.org/docs/rules/func-names
    'func-names': ['error', 'always'],

    // http://eslint.org/docs/rules/func-style
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],

    // https://eslint.org/docs/rules/function-paren-newline
    'function-paren-newline': ['error', 'consistent'],

    // http://eslint.org/docs/rules/id-blacklist
    'id-blacklist': ['off', 'error', 'err', 'cb', 'callback', 'data'],

    // http://eslint.org/docs/rules/id-length
    'id-length': ['error', {
      min: 2,
      properties: 'always',
      exceptions: [
        'x',
        'y',
        't',
      ],
    }],

    // http://eslint.org/docs/rules/id-match
    'id-match': 'off',

    // https://eslint.org/docs/rules/implicit-arrow-linebreak
    'implicit-arrow-linebreak': ['error', 'beside'],

    // http://eslint.org/docs/rules/indent
    indent: ['error', 2, {
      SwitchCase: 1,
      VariableDeclarator: {
        var: 2,
        let: 2,
        const: 3,
      },
      outerIIFEBody: 1,
      MemberExpression: 1,
      FunctionDeclaration: {
        parameters: 1,
        body: 1,
      },
      FunctionExpression: {
        parameters: 1,
        body: 1,
      },
      CallExpression: { arguments: 1 },
      ArrayExpression: 1,
      ObjectExpression: 1,
    }],

    // http://eslint.org/docs/rules/jsx-quotes
    'jsx-quotes': ['error', 'prefer-double'],

    // http://eslint.org/docs/rules/key-spacing
    'key-spacing': ['error', {
      beforeColon: false,
      afterColon: true,
      mode: 'strict',
    }],

    // http://eslint.org/docs/rules/keyword-spacing
    'keyword-spacing': ['error', {
      before: true,
      after: true,
    }],

    // http://eslint.org/docs/rules/line-comment-position
    'line-comment-position': ['error', 'above'],

    // http://eslint.org/docs/rules/linebreak-style
    'linebreak-style': ['error', 'unix'],

    // http://eslint.org/docs/rules/lines-around-comment
    'lines-around-comment': 'off',

    // https://eslint.org/docs/rules/lines-between-class-members
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: false }],

    // http://eslint.org/docs/rules/max-depth
    'max-depth': ['error', { max: 3 }],

    // http://eslint.org/docs/rules/max-length
    'max-len': ['error', {
      code: 100,
      tabWidth: 2,
      comments: 100,
      ignoreComments: false,
      ignoreTrailingComments: false,
      ignoreUrls: true,
      ignoreStrings: false,
      ignoreTemplateLiterals: false,
      ignoreRegExpLiterals: true,
    }],

    // http://eslint.org/docs/rules/max-lines
    'max-lines': ['error', {
      max: 300,
      skipBlankLines: false,
      skipComments: false,
    }],

    // http://eslint.org/docs/rules/max-nested-callbacks
    'max-nested-callbacks': ['error', { max: 2 }],

    // http://eslint.org/docs/rules/max-params
    'max-params': ['error', { max: 4 }],

    // http://eslint.org/docs/rules/max-statements-per-line
    'max-statements-per-line': ['error', { max: 1 }],

    // https://eslint.org/docs/rules/multiline-comment-style
    'multiline-comment-style': ['error', 'separate-lines'],

    // http://eslint.org/docs/rules/max-statements
    'max-statements': 'off',

    // http://eslint.org/docs/rules/multiline-ternary
    'multiline-ternary': 'off',

    // http://eslint.org/docs/rules/new-cap
    'new-cap': ['error', {
      newIsCap: true,
      capIsNew: true,
      properties: true,
    }],

    // http://eslint.org/docs/rules/new-parens
    'new-parens': 'error',

    // http://eslint.org/docs/rules/newline-per-chained-call
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],

    // http://eslint.org/docs/rules/no-array-constructor
    'no-array-constructor': 'error',

    // http://eslint.org/docs/rules/no-bitwise
    'no-bitwise': 'error',

    // http://eslint.org/docs/rules/no-continue
    'no-continue': 'error',

    // http://eslint.org/docs/rules/no-inline-comments
    'no-inline-comments': 'error',

    // http://eslint.org/docs/rules/no-lonely-if
    'no-lonely-if': 'error',

    // http://eslint.org/docs/rules/no-mixed-operators
    'no-mixed-operators': ['error', {
      groups: [
        ['&', '|', '^', '~', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof'],
      ],
      allowSamePrecedence: true,
    }],

    // http://eslint.org/docs/rules/no-mixed-spaces-and-tabs
    'no-mixed-spaces-and-tabs': 'error',

    // http://eslint.org/docs/rules/no-multi-assign
    'no-multi-assign': 'error',

    // http://eslint.org/docs/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': ['error', {
      max: 1,
      maxBOF: 0,
      maxEOF: 1,
    }],

    // http://eslint.org/docs/rules/no-negated-condition
    'no-negated-condition': 'error',

    // http://eslint.org/docs/rules/no-nested-ternary
    'no-nested-ternary': 'error',

    // http://eslint.org/docs/rules/no-new-object
    'no-new-object': 'error',

    // http://eslint.org/docs/rules/no-plusplus
    'no-plusplus': 'error',

    // http://eslint.org/docs/rules/no-restricted-syntax
    'no-restricted-syntax': [
      'error',
      'WithStatement',
      'ForInStatement',
      'ForOfStatement',
      'LabeledStatement',
    ],

    // http://eslint.org/docs/rules/no-tabs
    'no-tabs': 'error',

    // http://eslint.org/docs/rules/no-ternary
    'no-ternary': 'off',

    // http://eslint.org/docs/rules/no-trailing-spaces
    'no-trailing-spaces': ['error', { skipBlankLines: false }],

    // http://eslint.org/docs/rules/no-underscore-dangle
    'no-underscore-dangle': 'off',

    // http://eslint.org/docs/rules/no-unneeded-ternary
    'no-unneeded-ternary': ['error', { defaultAssignment: true }],

    // http://eslint.org/docs/rules/no-whitespace-before-property
    'no-whitespace-before-property': 'error',

    // http://eslint.org/docs/rules/nonblock-statement-body-position
    'nonblock-statement-body-position': ['error', 'beside'],

    // http://eslint.org/docs/rules/object-curly-newline
    'object-curly-newline': ['error', {
      multiline: true,
      minProperties: 2,
    }],

    // http://eslint.org/docs/rules/object-curly-spacing
    'object-curly-spacing': ['error', 'always', {
      arraysInObjects: true,
      objectsInObjects: true,
    }],

    // http://eslint.org/docs/rules/object-property-newline
    'object-property-newline': [
      'error',
      { allowMultiplePropertiesPerLine: false },
    ],

    // http://eslint.org/docs/rules/one-var-declaration-per-line
    'one-var-declaration-per-line': ['error', 'always'],

    // http://eslint.org/docs/rules/one-var
    'one-var': ['error', 'never'],

    // http://eslint.org/docs/rules/operator-assignment
    'operator-assignment': ['error', 'always'],

    // http://eslint.org/docs/rules/operator-linebreak
    'operator-linebreak': ['error', 'before'],

    // http://eslint.org/docs/rules/padded-blocks
    'padded-blocks': ['error', 'never'],

    // http://eslint.org/docs/rules/padding-line-between-statements
    'padding-line-between-statements': ['error', {
      blankLine: 'always',
      prev: '*',
      next: 'class',
    }, {
      blankLine: 'always',
      prev: '*',
      next: 'return',
    }, {
      blankLine: 'always',
      prev: '*',
      next: 'if',
    }, {
      blankLine: 'always',
      prev: 'if',
      next: '*',
    }, {
      blankLine: 'always',
      prev: ['const', 'let', 'var'],
      next: '*',
    }, {
      blankLine: 'any',
      prev: ['const', 'let', 'var'],
      next: ['const', 'let', 'var'],
    }],

    // http://eslint.org/docs/rules/quote-props
    'quote-props': ['error', 'as-needed', {
      keywords: false,
      unnecessary: true,
      numbers: false,
    }],

    // http://eslint.org/docs/rules/quotes
    quotes: ['error', 'single', { avoidEscape: true }],

    // http://eslint.org/docs/rules/require-jsdoc
    'require-jsdoc': 'off',

    // http://eslint.org/docs/rules/semi-spacing
    'semi-spacing': ['error', {
      before: false,
      after: true,
    }],

    // http://eslint.org/docs/rules/semi
    semi: ['error', 'always'],

    // http://eslint.org/docs/rules/semi-style
    'semi-style': ['error', 'last'],

    // http://eslint.org/docs/rules/sort-keys
    'sort-keys': 'off',

    // http://eslint.org/docs/rules/sort-vars
    'sort-vars': 'off',

    // http://eslint.org/docs/rules/space-before-blocks
    'space-before-blocks': ['error', 'always'],

    // http://eslint.org/docs/rules/space-before-function-paren
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],

    // http://eslint.org/docs/rules/space-in-parens
    'space-in-parens': ['error', 'never'],

    // http://eslint.org/docs/rules/space-infix-ops
    'space-infix-ops': 'error',

    // http://eslint.org/docs/rules/space-unary-ops
    'space-unary-ops': ['error', {
      words: true,
      nonwords: false,
      overrides: {},
    }],

    // http://eslint.org/docs/rules/spaced-comment
    'spaced-comment': ['error', 'always', { block: { balanced: true } }],

    // http://eslint.org/docs/rules/switch-colon-spacing
    'switch-colon-spacing': ['error', {
      before: false,
      after: true,
    }],

    // http://eslint.org/docs/rules/template-tag-spacing
    'template-tag-spacing': ['error', 'never'],

    // http://eslint.org/docs/rules/unicode-bom
    'unicode-bom': ['error', 'never'],

    // http://eslint.org/docs/rules/wrap-regex
    'wrap-regex': 'off',
  },
};
