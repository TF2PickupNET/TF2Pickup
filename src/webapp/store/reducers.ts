import { combineReducers } from 'redux';

import userId from './user-id/reducer';
import config from './config/reducer';
import settings from './settings/reducer';
import userProfiles from './user-profiles/reducer';
import users from './users/reducer';
import pickupQueues from './pickup-queues/reducer';
import notifications from './notifications/reducer';

const reducers = combineReducers({
  users,
  userId,
  config,
  settings,
  userProfiles,
  pickupQueues,
  notifications,
});

type State = ReturnType<typeof reducers>;

export { State };

export default reducers;
