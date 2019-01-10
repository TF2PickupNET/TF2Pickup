declare module 'react-jss' {
  import {ComponentType, ReactNode} from 'react';
  import {
    CreateGenerateId,
    GenerateId,
    Jss,
    SheetsRegistry,
    Styles,
    StyleSheetFactoryOptions,
  } from 'jss';
  import {ThemeProvider, withTheme, createTheming, Theming} from 'theming';

  const jss: Jss;
  const createGenerateId: CreateGenerateId;
  const JssProvider: ComponentType<{
    jss?: Jss
    registry?: SheetsRegistry
    generateId?: GenerateId
    classNamePrefix?: string
    disableStylesGeneration?: boolean
    children: ReactNode
  }>;

  type ThemedStyles<Theme> = (theme: Theme) => Styles;

  interface WithStyles<S extends Styles | ThemedStyles<any>> {
    classes: Record<S extends ThemedStyles<any> ? keyof ReturnType<S> : keyof S, string>
  }

  interface Options extends StyleSheetFactoryOptions {
    index?: number
    injectTheme?: boolean
    jss?: Jss
    theming: Theming<object>
  }

  type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

  function withStyles<S extends Styles | ThemedStyles<any>>(
    styles: S,
    options?: Options,
  ): <Props extends WithStyles<S>>(
    comp: ComponentType<Props>
  ) => ComponentType<Omit<Props, 'classes'> & {classes?: Partial<Props['classes']>}>;

  export {
    SheetsRegistry,
    jss,
    createGenerateId,
    JssProvider,
    WithStyles,
    ThemeProvider,
    withTheme,
    createTheming
  };

  export default withStyles;
}
