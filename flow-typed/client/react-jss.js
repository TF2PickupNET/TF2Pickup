// @flow strict-local

import { type ComponentType } from 'react';
import type Jss from '../../packages/webapp/node_modules/jss/src/Jss';
import { type generateClassName } from '../../packages/webapp/node_modules/jss/src/types/jss';

declare module 'react-jss' {
  declare type Options = { index?: number };
  declare type ExtractReturnType = <R>(() => R) => R;

  declare export type Styles = { [key: string]: string | number | Styles };
  declare export type StaticStyles = { [key: string]: Styles };
  declare export type ThemedStyles = (theme: {}) => StaticStyles;

  declare export type StaticClasses<Styles: StaticStyles, Props: {}> = Props & { [key: $Keys<Styles>]: string };
  declare export type ThemedClasses<Styles: ThemedStyles, Props: {}> = Props &  {
    [key: $Keys<$Call<Styles, ExtractReturnType>>]: string,
  };

  declare export class JssProvider extends React$Component<{
    jss: Jss,
    classNamePrefix: string,
    generateClassName: generateClassName,
  }> {}

  declare export default function injectSheet<
    Styles: StaticStyles,
    Props,
    Comp: ComponentType<Props>,
    PassedProps: { classes: StaticClasses<Styles> },
  >(styles: Styles, options?: Options): (comp: Comp) => ComponentType<$Diff<Props, PassedProps>>;

  declare export default function injectSheet<
    Styles: ThemedStyles,
    Props,
    Comp: ComponentType<Props>,
    PassedProps: {
      classes: ThemedClasses<Styles>,
      theme: {},
    },
    >(styles: Styles, options?: Options): (comp: Comp) => ComponentType<$Diff<Props, PassedProps>>;
}
