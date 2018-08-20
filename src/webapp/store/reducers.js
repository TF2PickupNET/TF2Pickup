// @flow

import { combineReducers } from 'redux';

import user from './user/reducer';
import config from './config/reducer';
import settings from './settings/reducer';
import profile from './profile/reducer';

export default combineReducers({
  user,
  config,
  settings,
  profile,
});
