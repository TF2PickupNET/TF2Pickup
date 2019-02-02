import { Action } from 'redux';

import UserSettings from '../../../types/UserSettings';
import { AsyncItem } from '../types';

type State = AsyncItem<UserSettings>;

enum SettingsActionTypes {
  UPDATE = 'SETTINGS/UPDATE',
  START_FETCH = 'SETTINGS/START_FETCH',
  FETCH_FAILED = 'SETTINGS/FETCH_FAILED',
  FETCHED = 'SETTINGS/FETCHED',
}

type Actions =
  | Action<typeof SettingsActionTypes.START_FETCH>
  | Action<typeof SettingsActionTypes.FETCHED, { settings: UserSettings }>
  | Action<typeof SettingsActionTypes.FETCH_FAILED, { error: Error }>
  | Action<typeof SettingsActionTypes.UPDATE, { settings: UserSettings }>;

export {
  State,
  Actions,
  SettingsActionTypes,
};
