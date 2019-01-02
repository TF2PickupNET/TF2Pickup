declare module 'is_js' {
  interface Is {
    desktop(): boolean,
    chrome(version: string): boolean,
    firefox(version: string): boolean,
  }

  const is: Is;

  export default is;
}
