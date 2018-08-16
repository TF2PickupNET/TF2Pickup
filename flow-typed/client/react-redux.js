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

  declare type MapStateToProps<State, OwnProps, StateProps> = (
    state: State,
    props: OwnProps,
  ) => StateProps;
  declare type MapDispatchToProps<OwnProps, DispatchProps> = (
    state: Dispatch<>,
    props: OwnProps,
  ) => DispatchProps;

  declare export function connect<
    Props,
    Comp: ComponentType<Props>
    >(): (comp: Comp) => Class<Connect<Comp>>;

  declare export function connect<
    State,
    Props,
    StateProps,
    Comp: ComponentType<Props>
  >(
    mapStateToProps: MapStateToProps<State, Props, StateProps>
  ): (comp: Comp) => Class<Connect<Comp, StateProps>>;

  declare export function connect<
    Props,
    DispatchProps,
    Comp: ComponentType<Props>
    >(
      mapStateToProps: null,
      mapDispatchToProps: MapDispatchToProps<Props, DispatchProps>,
  ): (comp: Comp) => Class<Connect<Comp, {}, DispatchProps>>;

  declare export function connect<
    State,
    Props,
    DispatchProps,
    StateProps,
    Comp: ComponentType<Props>
    >(
    mapStateToProps: MapStateToProps<State, Props, StateProps>,
    mapDispatchToProps: MapDispatchToProps<Props, DispatchProps>,
  ): (comp: Comp) => Class<Connect<Comp, StateProps, DispatchProps>>;
}
