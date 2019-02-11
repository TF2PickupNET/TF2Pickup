declare module '@atlaskit/theme' {
  import { Properties } from 'csstype';

  type Style = Record<string, Properties>;

  type Styles = (style: Style) => Style;

  interface Colors {
    R300: string,
    Y300: string,
    G300: string,
    G400: string,
    B300: string,
    B400: string,
    B500: string,
    N10: string,
    N20: string,
    N40: string,
    N900: string,
  }

  const colors: Colors;

  export {
    colors,
    Styles,
    Style,
  };
}
