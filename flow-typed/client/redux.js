// @flow strict-local

import { type AsyncAction } from 'redux-thunk';

declare module 'redux' {
  declare export interface Action<Type: string = string, Payload: {} = {}> {
    type: Type,
    payload: Payload,
  }

  declare export type AsyncAction<State> = (
    dispatch: <T, P>(action: Action<T, P> | AsyncAction<State>) => void,
    getState: () => State,
  ) => void | Promise<void>;

  declare export type Dispatch<Actions = Action<>, State = {}> = (
    action: Actions | AsyncAction<Actions, State>,
  ) => void;

  declare export type Reducer<State, Actions> = (
    state: State | void,
    action: Actions,
  ) => State;

  declare export interface Enhancer<State> {
    (options: {
      dispatch(action: Action<>): void,
      getState(): State,
    }): (next: (action: Action<>) => Action<>) => (action: Action<>) => Action<>,
  }

  declare export interface Store<State> {
    getState(): State,
    dispatch<T, P, Actions>(action: Action<T, P> | AsyncAction<State, Actions>): void,
    subscribe(listener: () => void): () => void,
    nextReducer(reducer: Reducer<State, Action<>>): void,
  }

  declare export type CombinedReducer<S, A> = (state: $Shape<S> & {} | void, action: A) => S;

  declare export function combineReducers<O: {}, CA: Action<>>(
    reducers: O
  ): CombinedReducer<$ObjMap<O, <S, A>(r: Reducer<S, A>) => S>, CA>;

  declare export function bindActionCreators<Args: $ReadOnlyArray<mixed>>(
    action: (...args: Args) => Action<>,
    dispatch: (action: Action<>) => void,
  ): (...args: Args) => Action<>;

  declare export function bindActionCreators<K>(
    actions: { [key: K]: (...args: $ReadOnlyArray<mixed>) => Action<> },
    dispatch: Dispatch<string, {}>,
  ): { [key: K]: (...args: $ReadOnlyArray<mixed>) => void };

  declare export function applyMiddleware<State>(
    ...middlewares: $ReadOnlyArray<Enhancer<State>>
  ): Enhancer<State>;

  declare export function createStore<State>(
    reducer: Reducer<State, Action<>>,
    enhancer?: Enhancer<State>,
  ): Store<State>;
  declare export function createStore<State>(
    reducer: Reducer<State, Action<>>,
    preloadedState: State,
    enhancer?: Enhancer<State>,
  ): Store<State>;

  declare export function compose<A, B, C>(
    fn1: (arg: A) => B,
    fn2: (arg: B) => C,
  ): (arg: A) => C;

  declare export function compose<A, B, C, D>(
    fn1: (arg: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
  ): (arg: A) => D;

  declare export function compose<A, B, C, D, E>(
    fn1: (arg: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
  ): (arg: A) => E;
}
