// @flow strict-local

declare module 'config' {
  declare interface config {
    get<T>(path: string): T,
    has(path: string): boolean,
  }

  declare export default config;
}
