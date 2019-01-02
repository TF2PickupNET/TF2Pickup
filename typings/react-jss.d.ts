declare module 'react-jss' {
  import {
    ComponentType,
    ReactNode,
  } from 'react';

  interface ThemeProviderProps {
    theme: object,
    children: ReactNode,
  }

  const ThemeProvider: ComponentType<ThemeProviderProps>;

  interface Classes<Styles> {
    classes: Record<Styles extends (theme: any) => object ? keyof ReturnType<Styles> : keyof Styles, string>;
  }

  type Omit<Obj, Key extends string> = Pick<Obj, Exclude<keyof Obj, Key>>;

  function injectSheet<Props>(
    styles: object | ((theme: object) => object)
  ): (props: ComponentType<Props>) => ComponentType<Omit<Props, 'classes'>>;

  export {
    Classes,
    ThemeProvider,
  };

  export default injectSheet;
}
