// @flow strict-local

import { type Enhancer } from 'redux';

declare module 'redux-thunk' {
  declare export interface AsyncAction<State, Actions, Arg = null> {
    (dispatch: (action: Actions) => void, getState: () => State): void | Promise<void>,
    (dispatch: (action: Actions) => void, getState: () => State, arg: Arg): void | Promise<void>,
  }

  declare export default {
    (arg: mixed): Enhancer<>,
    withExtraArgument(arg: mixed): Enhancer<>,
  };
}
