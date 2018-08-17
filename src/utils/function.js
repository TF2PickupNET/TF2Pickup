// @flow

export function spreadArgs(fn: (...args: $ReadOnlyArray<mixed>) => mixed) {
  return (args: $ReadOnlyArray<mixed>): mixed => fn(...args);
}
