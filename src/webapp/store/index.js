// @flow

import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import app from '../app';

import reducers from './reducers';

type ExtractState = <R>(() => R) => R;
type State = $Call<ExtractState, reducers>;

const middlewares = applyMiddleware(thunk.withExtraArgument(app));

const store = createStore(
  reducers,
  composeWithDevTools(middlewares),
);

export type { State };

export default store;
