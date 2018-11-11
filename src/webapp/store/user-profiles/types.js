// @flow

import { type Action } from 'redux';

import { type UserProfile } from '../../../types/UserProfile';

type State = { [userId: string]: UserProfile };
type AddProfileAction = Action<'PROFILE/ADD', { profile: UserProfile }>;
type UpdateProfileAction = Action<'PROFILE/UPDATE', { profile: UserProfile }>;
type Actions = AddProfileAction | UpdateProfileAction;

const ADD_PROFILE = 'PROFILE/ADD';
const UPDATE_PROFILE = 'PROFILE/UPDATE';

export type {
  ADD_PROFILE,
  UPDATE_PROFILE,
  State,
  Actions,
  AddProfileAction,
  UpdateProfileAction,
};
