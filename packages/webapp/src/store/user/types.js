// @flow

import { type Action } from 'redux';
import { type User } from '@tf2pickup/types';

export type State = User | null;

export type Actions = Action<'USER/LOGOUT', null>
  | Action<'USER/LOGIN', { user: User }>
  | Action<'USER/UPDATE', { user: User }>;

export const LOGIN_USER = 'USER/LOGIN';
export const LOGOUT_USER = 'USER/LOGOUT';
export const UPDATE_USER = 'USER/UPDATE';
