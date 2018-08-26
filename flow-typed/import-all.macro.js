// @flow

declare module 'import-all.macro' {
  declare interface ImportAll {
    sync(glob: string): {
      [key: string]: {
        default: string,
      },
    },
  }

  declare export default ImportAll;
}
