// @flow strict-local

declare module 'promise-serial' {
  declare export default function serial<T>(
    promises: $ReadOnlyArray<Promise<T>>
  ): $ReadOnlyArray<T>;
}
