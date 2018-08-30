// @flow

import { type Action } from 'redux';

import { type UserProfile } from '../../../types/user-profile';
import { type UserId } from '../../../types/user';

export type State = { [userId: UserId]: UserProfile };
export type Actions = Action<'PROFILE/ADD', { profile: UserProfile }>
  | Action<'PROFILE/UPDATE', { profile: UserProfile }>;

export const ADD_PROFILE = 'PROFILE/ADD';
export const UPDATE_PROFILE = 'PROFILE/UPDATE';
