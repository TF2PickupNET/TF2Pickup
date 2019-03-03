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
} from '@webapp/store/types';
import reducers, { State } from '@webapp/store/reducers';
import useActions from '@webapp/store/use-actions';
import {
  useMakeMapState,
  useMapState,
} from '@webapp/store/use-store';
import Actions from '@webapp/store/actions';

const middleware = applyMiddleware(thunk);

interface ThunkStore {
  dispatch(action: Actions | AsyncAction): void,
}

const store = createStore<State, AnyAction, ThunkStore, {}>(
  reducers,
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(middleware)
    : middleware,
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
