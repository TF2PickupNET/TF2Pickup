// @flow

declare module 'js-cookie' {
  declare export default {
    get(name: string): string,
    set(name: string, value: string): void,
  }
}
