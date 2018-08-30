// @flow

import { combineReducers } from 'redux';

import userId from './user-id/reducer';
import config from './config/reducer';
import settings from './settings/reducer';
import userProfiles from './user-profiles/reducer';
import users from './users/reducer';

export default combineReducers({
  users,
  userId,
  config,
  settings,
  userProfiles,
});
