// @flow

declare module 'is_js' {
  declare interface IS {
    desktop(): boolean,
    chrome(version?: number | string): boolean,
    firefox(version?: number | string): boolean,
    url(url: string): boolean,
  }

  declare export default IS;
}
