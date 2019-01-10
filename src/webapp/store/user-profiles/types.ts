import { Action } from 'redux';

import UserProfile from '../../../types/UserProfile';
import { AsyncItem } from '../types';

type State = Record<string, AsyncItem<UserProfile>>;

const START_FETCH_PROFILE = 'PROFILE/START-FETCH';
const FETCHED_PROFILE = 'PROFILE/FETCHED';
const FETCH_ERROR_PROFILE = 'PROFILE/FETCH-ERROR';
const UPDATE_PROFILE = 'PROFILE/UPDATE';

type Actions =
  | Action<typeof UPDATE_PROFILE, { profile: UserProfile }>
  | Action<typeof START_FETCH_PROFILE, { userId: string }>
  | Action<typeof FETCHED_PROFILE, { profile: UserProfile }>
  | Action<typeof FETCH_ERROR_PROFILE, {
    error: Error,
    userId: string,
  }>;

export {
  UPDATE_PROFILE,
  START_FETCH_PROFILE,
  FETCH_ERROR_PROFILE,
  FETCHED_PROFILE,
  State,
  Actions,
};
