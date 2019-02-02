import { Action } from 'redux';

import UserProfile from '../../../types/UserProfile';
import { AsyncItem } from '../types';

type State = Record<string, AsyncItem<UserProfile>>;

enum UserProfileActionTypes {
  START_FETCH = 'USER-PROFILE/START-FETCH',
  FETCHED = 'USER-PROFILE/FETCHED',
  FETCH_ERROR = 'USER-PROFILE/FETCH-ERROR',
  UPDATE = 'USER-PROFILE/UPDATE',
}

type Actions =
  | Action<typeof UserProfileActionTypes.UPDATE, { profile: UserProfile }>
  | Action<typeof UserProfileActionTypes.START_FETCH, { userId: string }>
  | Action<typeof UserProfileActionTypes.FETCHED, { profile: UserProfile }>
  | Action<typeof UserProfileActionTypes.FETCH_ERROR, {
    error: Error,
    userId: string,
  }>;

export {
  UserProfileActionTypes,
  State,
  Actions,
};
