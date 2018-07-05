// @flow strict-local

declare module 'shelljs' {
  declare export default {
    rm(...args: $ReadOnlyArray<string>): void,
    exec(command: string, options?: { silent?: boolean }): { code: number },
    exit(code: number): void,
    mkdir(dir: string): void,
    find(path: string): $ReadOnlyArray<string>,
  }
}
