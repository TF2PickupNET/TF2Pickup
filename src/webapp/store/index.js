// @flow

import { createContext } from 'react';
import {
  createStore,
  applyMiddleware,
  type Store,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers, { type State } from './reducers';

const middlewares = applyMiddleware(thunk);

const store: Store<State> = createStore(
  reducers,
  composeWithDevTools(middlewares),
);

const StoreContext = createContext<Store<State>>(store);

export type {
  StoreContext,
  State,
};

export default store;
