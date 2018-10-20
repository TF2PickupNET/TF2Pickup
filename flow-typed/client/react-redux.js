// @flow strict-local

import {
  type Store,
  type Dispatch,
} from 'redux';
import {
  type Node,
  type ComponentType,
  type ElementConfig,
} from 'react';

declare module 'react-redux' {
  declare type ProviderProps = {
    store: Store<{}>,
    children: Node,
  };

  declare export class Provider extends React$Component<ProviderProps> {}

  declare export class Connect<
    Comp,
    StateProps = {},
    DispatchProps = {},
    CombinedProps = { dispatch: Dispatch<> } & StateProps & DispatchProps,
  > extends React$Component<$Diff<ElementConfig<Comp>, CombinedProps>> {}

  declare export type MapStateToProps<State, OwnProps, ConnectedProps> = (
    state: State,
    props: OwnProps,
  ) => ConnectedProps;

  declare export interface MapDispatchToProps<Props> {
    (state: Dispatch<>, props: Props): $Shape<Props>,
  }

  declare export function connect<
    Props,
    Comp: ComponentType<Props>
    >(): (comp: Comp) => Class<Connect<Comp>>;

  declare export function connect<
    State,
    Props,
    StateProps: $Shape<Props>,
    Comp: ComponentType<Props>
    >(
      mapStateToProps: () => (state: State, props: Props) => StateProps,
  ): (comp: Comp) => Class<Connect<Comp, StateProps>>;

  declare export function connect<
    State,
    Props,
    StateProps: $Shape<Props>,
    Comp: ComponentType<Props>
    >(
      mapStateToProps: (state: State, props: Props) => StateProps,
  ): (comp: Comp) => Class<Connect<Comp, StateProps>>;

  declare export function connect<
    Props,
    DispatchProps: $Shape<Props>,
    Comp: ComponentType<Props>
    >(
      mapStateToProps: null,
      mapDispatchToProps: (state: Dispatch<>, props: Props) => DispatchProps,
  ): (comp: Comp) => Class<Connect<Comp, {}, DispatchProps>>;

  declare export function connect<
    State,
    Props,
    DispatchProps: $Shape<Props>,
    StateProps: $Shape<Props>,
    Comp: ComponentType<Props>
    >(
      mapStateToProps: (state: State, props: Props) => StateProps,
      mapDispatchToProps: (state: Dispatch<>, props: Props) => DispatchProps,
  ): (comp: Comp) => Class<Connect<Comp, StateProps, DispatchProps>>;

  declare export function connect<
    State,
    Props,
    DispatchProps: $Shape<Props>,
    StateProps: $Shape<Props>,
    Comp: ComponentType<Props>
    >(
      mapStateToProps: () => (state: State, props: Props) => StateProps,
      mapDispatchToProps: (state: Dispatch<>, props: Props) => DispatchProps,
  ): (comp: Comp) => Class<Connect<Comp, StateProps, DispatchProps>>;
}
