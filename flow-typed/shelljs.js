// @flow

declare module 'shelljs' {
  declare interface Shell {
    mkdir(path: string): void,
    find(glob: string): $ReadOnlyArray<string>,
  }

  declare export default Shell;
}
