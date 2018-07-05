// @flow strict-local

declare module 'flow-typed/server/query-string' {
  declare export default {
    parse(query: string): { [key: string]: string },
    stringify(obj: { [key: string]: string }): string,
  }
}
