declare module '@atlaskit/theme' {
  import { Properties } from 'csstype';

  type Style = Record<string, Properties>;

  type Styles = (style: Style) => Style;

  interface Colors {
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
