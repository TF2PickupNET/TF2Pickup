// @flow

import {
  createStore,
  applyMiddleware,
  type Store,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import app from '../app';

import reducers, { type State } from './reducers';

const middlewares = applyMiddleware(thunk.withExtraArgument(app));

const store: Store<State> = createStore(
  reducers,
  composeWithDevTools(middlewares),
);

export type { State };

export default store;
