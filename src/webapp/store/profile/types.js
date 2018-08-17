// @flow

import { type Action } from 'redux';

import { type UserProfile } from '../../../types';

export type State = null | UserProfile;
export type Actions = Action<'PROFILE/SET', { profile: State }>
  | Action<'PROFILE/UPDATE', { profile: UserProfile }>;

export const SET_PROFILE = 'PROFILE/SET';
export const UPDATE_PROFILE = 'PROFILE/UPDATE';
