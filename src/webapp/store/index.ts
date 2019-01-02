import {
  createStore,
  applyMiddleware,
  Store,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers, { State } from './reducers';
import Actions from "./actions";

const middlewares = applyMiddleware(thunk);

const store: Store<State, Actions> = createStore(
  reducers,
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(middlewares)
    : middlewares,
);

export { State };

export default store;
