// @flow

import { type Action } from 'redux';

import { type UserProfile } from '../../../types/UserProfile';

export type State = { [userId: string]: UserProfile };
export type Actions = Action<'PROFILE/ADD', { profile: UserProfile }>
  | Action<'PROFILE/UPDATE', { profile: UserProfile }>;

export const ADD_PROFILE = 'PROFILE/ADD';
export const UPDATE_PROFILE = 'PROFILE/UPDATE';
