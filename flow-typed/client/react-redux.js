// @flow strict-local

import {
  type Store,
  type Dispatch,
} from 'redux';
import {
  type Node,
  type ComponentType,
  type ElementProps,
  type ElementConfig,
} from 'react';

declare module 'react-redux' {
  declare type ProviderProps = {
    store: Store<{}>,
    children: Node,
  };

  declare interface Options<State, Props, StateProps, OwnProps> {
    pure?: boolean,
    storeKey?: string,
    areStatesEqual?: (next: State, prev: State) => boolean,
    areOwnPropsEqual?: (next: OwnProps, prev: OwnProps) => boolean,
    areStatePropsEqual?: (next: StateProps, prev: StateProps) => boolean,
    areMergedPropsEqual?: (next: Props, prev: Props) => boolean,
  }

  declare type Connect<Props> = ComponentType<$Diff<Props, { dispatch: Dispatch<> }>>;

  declare export class Provider extends React$Component<ProviderProps> {}

  declare export function connect<Comp: ComponentType<{}>>(): (comp: Comp) => Connect<ElementConfig<Comp>>;

  declare export function connect<
    Props,
    Comp: ComponentType<Props>,
    State,
    StateProps,
    OwnProps: $Diff<ElementProps<Comp>, StateProps>,
    >(
    mapStateToProps: (state: State, ownProps: $Diff<Props, StateProps>) => StateProps,
  ): (comp: Comp) => Connect<$Diff<Props, StateProps>>;

  declare export function connect<
    Props,
    Comp: ComponentType<Props>,
    State,
    StateProps,
    DispatchProps,
    OwnProps: $Diff<ElementProps<Comp>, StateProps & DispatchProps>,
    >(
    mapStateToProps: null | (state: State, ownProps: OwnProps) => StateProps,
    mapDispatchToProps: (dispatch: Dispatch<>, ownProps: OwnProps) => DispatchProps,
  ): (comp: Comp) => Connect<OwnProps>;

  declare export function connect<
    Props,
    Comp: ComponentType<Props>,
    State,
    StateProps,
    DispatchProps,
    OwnProps: $Diff<ElementProps<Comp>, StateProps & DispatchProps>,
    >(
    mapStateToProps: null | (state: State, ownProps: OwnProps) => StateProps,
    mapDispatchToProps: null | (dispatch: Dispatch<>, ownProps: OwnProps) => DispatchProps,
    mergeProps: (stateProps: StateProps, dispatchProps: DispatchProps, ownProps: OwnProps) => Props,
  ): (comp: Comp) => Connect<OwnProps>;

  declare export function connect<
    Props,
    Comp: ComponentType<Props>,
    State,
    StateProps,
    DispatchProps,
    OwnProps: $Diff<ElementProps<Comp>, StateProps & DispatchProps>,
    >(
    mapStateToProps: null | (state: State, ownProps: OwnProps) => StateProps,
    mapDispatchToProps: null | (dispatch: Dispatch<>, ownProps: OwnProps) => DispatchProps,
    mergeProps: null | (
      stateProps: StateProps,
      dispatchProps: DispatchProps,
      ownProps: OwnProps,
    ) => Props,
    options: Options<State, Props, StateProps, OwnProps>,
  ): (comp: Comp) => Connect<OwnProps>;
}
