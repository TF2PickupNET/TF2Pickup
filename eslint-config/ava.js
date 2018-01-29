module.exports = {
  rules: {
    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/assertion-arguments.md
    'ava/assertion-arguments': ['error', { message: 'never' }],

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/max-asserts.md
    'ava/max-asserts': ['error', 5],

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/no-async-fn-without-await.md
    'ava/no-async-fn-without-await': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/no-cb-test.md
    'ava/no-cb-test': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/no-duplicate-modifiers.md
    'ava/no-duplicate-modifiers': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/no-identical-title.md
    'ava/no-identical-title': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/no-ignored-test-files.md
    'ava/no-ignored-test-files': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/no-invalid-end.md
    'ava/no-invalid-end': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/no-nested-tests.md
    'ava/no-nested-tests': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/no-only-test.md
    'ava/no-only-test': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/no-skip-assert.md
    'ava/no-skip-assert': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/no-skip-test.md
    'ava/no-skip-test': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/no-statement-after-end.md
    'ava/no-statement-after-end': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/no-todo-implementation.md
    'ava/no-todo-implementation': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/no-todo-test.md
    'ava/no-todo-test': 'warn',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/no-unknown-modifiers.md
    'ava/no-unknown-modifiers': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/prefer-async-await.md
    'ava/prefer-async-await': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/prefer-power-assert.md
    'ava/prefer-power-assert': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/test-ended.md
    'ava/test-ended': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/test-title.md
    'ava/test-title': ['error', 'always'],

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/use-t-well.md
    'ava/use-t-well': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/use-t.md
    'ava/use-t': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/use-test.md
    'ava/use-test': 'error',

    // https://github.com/avajs/eslint-plugin-ava/tree/master/docs/rules/use-true-false.md
    'ava/use-true-false': 'error',
  },
};
