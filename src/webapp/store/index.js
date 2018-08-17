// @flow

import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import app from '../app';

import user from './user/reducer';
import config from './config/reducer';
import settings from './settings/reducer';
import profile from './profile/reducer';

const reducer = combineReducers({
  user,
  config,
  settings,
  profile,
});
const middlewares = applyMiddleware(thunk.withExtraArgument(app));

const store = createStore(
  reducer,
  composeWithDevTools(middlewares),
);

export default store;
