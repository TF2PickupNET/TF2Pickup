import { combineReducers } from 'redux';

import userId from './user-id/reducer';
import config from './config/reducer';
import settings from './settings/reducer';
import userProfiles from './user-profiles/reducer';
import users from './users/reducer';
import pickupQueues from './pickup-queues/reducer';

interface State {
  userId: ReturnType<typeof userId>,
  config: ReturnType<typeof config>,
  settings: ReturnType<typeof settings>,
  userProfiles: ReturnType<typeof userProfiles>,
  users: ReturnType<typeof users>,
  pickupQueues: ReturnType<typeof pickupQueues>,
}

export { State };

export default combineReducers<State>({
  users,
  userId,
  config,
  settings,
  userProfiles,
  pickupQueues,
});
