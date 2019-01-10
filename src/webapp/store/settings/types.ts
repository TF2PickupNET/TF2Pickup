import { Action } from 'redux';

import UserSettings from '../../../types/UserSettings';
import { AsyncItem } from '../types';

const START_FETCH_SETTINGS = 'SETTINGS/START-FETCH';
const FETCHED_SETTINGS = 'SETTINGS/FETCHED';
const FETCH_FAILED_SETTINGS = 'SETTINGS/FETCH-FAILED';
const UPDATE_SETTINGS = 'SETTINGS/UPDATE';

type State = AsyncItem<UserSettings>;

type Actions =
  | Action<typeof START_FETCH_SETTINGS>
  | Action<typeof FETCHED_SETTINGS, { settings: UserSettings }>
  | Action<typeof FETCH_FAILED_SETTINGS, { error: Error }>
  | Action<typeof UPDATE_SETTINGS, { settings: UserSettings }>;

export {
  State,
  Actions,

  START_FETCH_SETTINGS,
  FETCHED_SETTINGS,
  FETCH_FAILED_SETTINGS,
  UPDATE_SETTINGS,
};
