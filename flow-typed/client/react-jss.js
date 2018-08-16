// @flow strict-local

import {
  type ComponentType,
  type ElementConfig,
} from 'react';

import Jss from '../../packages/webapp/node_modules/jss/src/Jss';
import SheetsRegistry from '../../packages/webapp/node_modules/jss/src/SheetsRegistry';
import Sheet from '../../packages/webapp/node_modules/jss/src/StyleSheet';
import { type generateClassName } from '../../packages/webapp/node_modules/jss/src/types/jss';

declare module 'react-jss' {
  declare type Options = { index?: number };
  declare type ExtractReturnType = <R>(() => R) => R;

  declare export type Styles = { [key: string]: string | number | Styles };
  declare export type StaticStyles = { [key: string]: Styles };
  declare export type ThemedStyles = (theme: {}) => StaticStyles;

  declare export type StaticClasses<Styles: StaticStyles> = { [key: $Keys<Styles>]: string };
  declare export type ThemedClasses<Styles: ThemedStyles> = {
    [key: $Keys<$Call<Styles, ExtractReturnType>>]: string,
  };

  declare type AlwaysInjectedProps = {
    sheet: Sheet,
    classes: { [key: string]: string },
  };
  declare type HOCProps<
    Comp,
    InjectedProps
  > = $Diff<ElementConfig<Comp>, AlwaysInjectedProps & InjectedProps>;

  declare class HOC<Comp, InjectedProps> extends React$Component<HOCProps<Comp, InjectedProps>> {
    static InnerComponent: Comp,
  }

  declare export class JssProvider extends React$Component<{
    registry: SheetsRegistry,
    jss: Jss,
    classNamePrefix: string,
    generateClassName: generateClassName,
    disableStylesGeneration: boolean,
  }> {}

  declare export default function injectSheet<
    Styles: StaticStyles,
    Props: { classes: StaticClasses<Styles> },
    Comp: ComponentType<Props>
  >(styles: Styles, options?: Options): (comp: Comp) => Class<HOC<Comp, {}>>;

  declare export default function injectSheet<
    Styles: ThemedStyles,
    Props: { classes: ThemedClasses<Styles> },
    Comp: ComponentType<Props>,
  >(styles: Styles, options?: Options): (comp: Comp) => Class<HOC<Comp, { theme: {} }>>;
}
