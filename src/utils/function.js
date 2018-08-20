// @flow

export function spreadArgs(fn: (...args: $ReadOnlyArray<mixed>) => mixed) {
  return (args: $ReadOnlyArray<mixed>): mixed => fn(...args);
}

export function isFunc(func: mixed): %checks {
  return typeof func === 'function';
}
