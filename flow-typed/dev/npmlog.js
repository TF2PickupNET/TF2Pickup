// @flow strict-local

declare module 'npmlog' {
  declare export default {
    info(msg: string): void,
    error(msg: string): void,
  }
}
