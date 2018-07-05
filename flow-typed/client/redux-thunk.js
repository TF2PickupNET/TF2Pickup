// @flow strict-local

import {
  type Enhancer,
  type Dispatch,
} from 'redux';

declare module 'redux-thunk' {
  declare export interface Thunk<State> {
    (dispatch: Dispatch<>, getState: () => State): void,
    (dispatch: Dispatch<>, getState: () => State, arg: mixed): void,
  }

  declare export default {
    (arg: mixed): Enhancer<>,
    withExtraArgument(arg: mixed): Enhancer<>,
  };
}
