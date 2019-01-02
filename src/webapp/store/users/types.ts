import { Action } from 'redux';

import User from '../../../types/User';
import { AsyncItem } from '../types';

type State = { [userId: string]: AsyncItem<User> };

const UPDATE_USER = 'USERS/UPDATE';
const FETCHED_USER = 'USERS/FETCHED';
const STARTED_FETCH_USER = 'USERS/STARTED-FETCH';
const FETCH_FAILED = 'USERS/FETCH-FAILED';

type Actions = Action<typeof FETCHED_USER, { user: User }>
  | Action<typeof UPDATE_USER, { user: User }>
  | Action<typeof STARTED_FETCH_USER, { userId: string }>
  | Action<typeof FETCH_FAILED, {
      userId: string,
      error: Error,
    }>;

export {
  State,
  Actions,
  UPDATE_USER,
  FETCH_FAILED,
  FETCHED_USER,
  STARTED_FETCH_USER,
};
