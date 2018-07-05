// @flow strict-local

declare module 'deepmerge' {
  declare export default {
    (obj1: {}, obj2: {}): {},
    all<T: {}>(arr: $ReadOnlyArray<{}>): T,
  }
}
