// @flow

declare module 'is_js' {
  declare interface IS {
    desktop(): boolean,
    chrome(version?: number): boolean,
    firefox(version?: number): boolean,
  }

  declare export default IS;
}
