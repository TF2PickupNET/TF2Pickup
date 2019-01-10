declare module 'redux' {
  interface Action<Type extends string = string, Payload extends object = {}> {
    type: Type,
    payload: Payload,
  }

  type AsyncAction<State, Actions> = (
    dispatch: <Actions2, Return2>(action: Actions | AsyncAction<State, Actions2>) => void,
    getState: () => State,
  ) => Promise<void> | void;

  type Reducer<State, Actions> = (
    state: State | undefined,
    action: Actions,
  ) => State;

  interface Enhancer<State, Actions> {
    (options: {
      dispatch(action: Actions): void,
      getState(): State,
    }): (next: (action: Actions) => Actions) => (action: Actions) => Actions,
  }

  interface Store<State, Actions> {
    getState(): State,
    dispatch(action: Actions | AsyncAction<State, Actions>): void,
    subscribe(listener: () => void): () => void,
    nextReducer(reducer: Reducer<State, Action<string, object>>): void,
  }

  function combineReducers<S extends object>(
    reducers: { [K in keyof S]: Reducer<S[K], Action<any, any>> }
  ): Reducer<S, Action<string, object>>

  function applyMiddleware<State, Actions>(
    ...middlewares: Array<Enhancer<State, Actions>>
  ): Enhancer<State, Actions>;

  function createStore<State, Actions>(
    reducer: Reducer<State, Actions>,
    enhancer?: Enhancer<State, Actions>,
  ): Store<State, Actions>;

  function createStore<State, Actions>(
    reducer: Reducer<State, Actions>,
    preloadedState: State,
    enhancer?: Enhancer<State, Actions>,
  ): Store<State, Actions>;

  export {
    Action,
    AsyncAction,
    Enhancer,
    Store,
    combineReducers,
    applyMiddleware,
    createStore,
  };
}
