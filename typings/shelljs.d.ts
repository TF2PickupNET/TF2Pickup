declare module 'shelljs' {
  interface Shell {
    mkdir(path: string): void,
    find(path: string): string[],
  }

  const shell: Shell;

  export default shell;
}
