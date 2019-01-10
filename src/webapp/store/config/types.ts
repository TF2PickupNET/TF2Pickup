import { Action } from 'redux';

import Config from '../../../types/Configuration';
import { AsyncItem } from '../types';

type State = AsyncItem<Config>;

const START_FETCH_CONFIG = 'CONFIG/START-FETCH';
const FETCHED_CONFIG = 'CONFIG/FETCHED';
const FETCH_ERROR_CONFIG = 'CONFIG/FETCH-ERROR';

type Actions =
  | Action<typeof START_FETCH_CONFIG>
  | Action<typeof FETCHED_CONFIG, { config: Config }>
  | Action<typeof FETCH_ERROR_CONFIG, { error: Error }>;

export {
  State,
  Actions,
  START_FETCH_CONFIG,
  FETCH_ERROR_CONFIG,
  FETCHED_CONFIG,
};
