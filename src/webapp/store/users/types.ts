import { Action } from 'redux';

import User from '../../../types/User';
import { AsyncItem } from '../types';

type State = Record<string, AsyncItem<User>>;

enum UsersActionTypes {
  UPDATE = 'USERS/UPDATE',
  FETCHED = 'USERS/FETCHED',
  START_FETCH = 'USERS/START-FETCH',
  FETCH_FAILED = 'USERS/FETCH-FAILED',
}

type Actions =
  | Action<typeof UsersActionTypes.UPDATE, { user: User }>
  | Action<typeof UsersActionTypes.FETCHED, { user: User }>
  | Action<typeof UsersActionTypes.START_FETCH, { userId: string }>
  | Action<typeof UsersActionTypes.FETCH_FAILED, {
    userId: string,
    error: Error,
  }>;

export {
  State,
  Actions,
  UsersActionTypes,
};
