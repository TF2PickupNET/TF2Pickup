import {
  createStore,
  applyMiddleware,
  AnyAction,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  AsyncAction,
  Action,
  AsyncStatus,
  AsyncItem,
} from './types';
import reducers, { State } from './reducers';
import useActions from './use-actions';
import {
  useMakeMapState,
  useMapState,
} from './use-store';
import Actions from './actions';

const middlewares = applyMiddleware(thunk);

interface ThunkStore {
  dispatch(action: Actions | AsyncAction): void,
}

const store = createStore<State, AnyAction, ThunkStore, {}>(
  reducers,
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(middlewares)
    : middlewares,
);

export {
  State,
  AsyncAction,
  Actions,
  Action,
  AsyncStatus,
  AsyncItem,

  useActions,
  useMakeMapState,
  useMapState,
};

export default store;
