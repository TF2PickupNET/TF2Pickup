// @flow strict-local

declare module 'redux' {
  declare export interface Action<Type: string = string, Payload: {} | null = null> {
    type: Type,
    payload: Payload,
  }

  declare export type Reducer<State> = (
    state: State | void,
    // $FlowFixMe: Weirdly flow throws an error here
    action: Action<>,
  ) => State;

  declare export type Dispatch<T, P> = (action: Action<>) => void;

  declare export interface Enhancer<State> {
    (options: {
      dispatch(action: Action<>): void,
      getState(): State,
    }): (next: (action: Action<>) => Action<>) => (action: Action<>) => Action<>,
  }

  declare export interface Store<State: {}> {
    getState(): State,
    dispatch<T, A>(action: Action<T, A>): void,
    subscribe(listener: () => void): () => void,
    nextReducer(reducer: Reducer<State>): void,
  }

  declare export type CombinedReducer<S, A> = (state: $Shape<S> & {} | void, action: A) => S;

  declare export function combineReducers<O: {}, A>(
    reducers: O
  ): CombinedReducer<$ObjMap<O, <S>(r: Reducer<S>) => S>, A>;

  declare export function bindActionCreators<Args: $ReadOnlyArray<mixed>>(
    action: (...args: Args) => Action<>,
    dispatch: (action: Action<>) => void,
  ): (...args: Args) => Action<>;

  declare export function bindActionCreators<K>(
    actions: { [key: K]: (...args: $ReadOnlyArray<mixed>) => Action<string, {}> },
    dispatch: Dispatch<string, {}>,
  ): { [key: K]: (...args: $ReadOnlyArray<mixed>) => void };

  declare export function applyMiddleware<State>(
    ...middlewares: $ReadOnlyArray<Enhancer<State>>
  ): Enhancer<State>;

  declare export function createStore<State>(
    reducer: Reducer<State>,
    enhancer?: Enhancer<State>,
  ): Store<State>;
  declare export function createStore<State>(
    reducer: Reducer<State>,
    preloadedState: State,
    enhancer?: Enhancer<State>,
  ): Store<State>;

  declare export function compose<R>(
    ...fns: $ReadOnlyArray<(...args: $ReadOnlyArray<mixed>) => R>
  ): (arg: R) => R;
}
