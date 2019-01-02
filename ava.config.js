export default {
  require: [
    'raf/polyfill',
    'ts-node/register/transpile-only',
  ],
  failFast: true,
  cache: true,
  concurrency: 5,
  failWithoutAssertions: true,
  verbose: true,
  compileEnhancements: true,
  extensions: ['ts', 'tsx'],
  files: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
};
