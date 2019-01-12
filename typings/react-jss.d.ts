declare module 'react-jss' {
  import { ComponentType } from 'react';

  type Styles = Record<string, object>;

  type ThemedStyles<Theme> = (theme: Theme) => Styles;

  interface WithStyles<Style extends Styles | ThemedStyles<any>> {
    classes: Record<keyof (Style extends ThemedStyles<any> ? ReturnType<Style> : Style), string>,
  }

  type Omit<Obj, Key> = Pick<Obj, Exclude<keyof Obj, Key>>;

  function withStyles<Style extends Styles | ThemedStyles<any>>(
    styles: Style,
  ): <Props extends WithStyles<Style>>(
    comp: ComponentType<Props>,
  ) => ComponentType<Omit<Props, 'classes'> & {classes?: Partial<Props['classes']>}>;

  export { WithStyles };

  export default withStyles;
}
