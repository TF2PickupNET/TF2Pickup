/* eslint-disable global-require, import/no-dynamic-require */

import test from 'ava';
import loadEslintRules from 'eslint/lib/load-rules';
import configuredEslintRules from 'configured-eslint-rules';

import config from '../.eslintrc';

const configuredRules = configuredEslintRules();

function validateRule(t, ruleName, ruleInfo) {
  if (ruleInfo.meta && ruleInfo.meta.deprecated) {
    if (configuredRules.includes(ruleName)) {
      t.fail(`Found a deprecated rule ${ruleName}`);
    }
  } else if (!configuredRules.includes(ruleName)) {
    t.fail(`Missing configuration of ${ruleName}`);
  }
}

test('ESLint rules', (t) => {
  const eslintRules = loadEslintRules();

  Object
    .keys(eslintRules)
    .forEach(rule => validateRule(t, rule, require(eslintRules[rule])));

  t.pass();
});

function testPlugin(pluginName) {
  test(`Testing eslint plugin: ${pluginName}`, (t) => {
    const plugin = require(`eslint-plugin-${pluginName}`);

    Object
      .keys(plugin.rules)
      .forEach(rule => validateRule(t, `${pluginName}/${rule}`, plugin.rules[rule]));

    t.pass();
  });
}

config.plugins.forEach((pluginName) => {
  testPlugin(pluginName);
});
