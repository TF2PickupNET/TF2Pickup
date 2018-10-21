// @flow

declare module 'pretty-error' {
  declare export default class PrettyError {
    withoutColors(): void,
    render(error: Error): string,
  }
}
