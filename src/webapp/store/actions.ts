import { Actions as ConfigActions } from './config/types';
import { Actions as SettingsActions } from './settings/types';
import { Actions as UserIdActions } from './user-id/types';
import { Actions as UserProfilesActions } from './user-profiles/types';
import { Actions as UsersActions } from './users/types';
import { Actions as PickupQueuesActions } from './pickup-queues/types';

type Actions =
  | ConfigActions
  | SettingsActions
  | UserIdActions
  | UserProfilesActions
  | UsersActions
  | PickupQueuesActions;

export default Actions;
