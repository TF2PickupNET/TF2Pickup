import { Actions as ConfigActions } from './config/types';
import { Actions as SettingsActions } from './settings/types';
import { Actions as UserIdActions } from './user-id/types';
import { Actions as UserProfilesActions } from './user-profiles/types';
import { Actions as UsersActions } from './users/types';
import { Actions as PickupQueuesActions } from './pickup-queues/types';
import { Actions as PickupPlayerActions } from './pickup-players/types';
import { Actions as NotificationActions } from './notifications/types';
import { Actions as PickupActions } from './pickups/types';

type Actions =
  | ConfigActions
  | SettingsActions
  | UserIdActions
  | UserProfilesActions
  | UsersActions
  | PickupQueuesActions
  | NotificationActions
  | PickupPlayerActions
  | PickupActions;

export default Actions;
