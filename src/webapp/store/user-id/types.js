// @flow

import { type Action } from 'redux';

export type State = string | null;

export type Actions = Action<'USER/LOGOUT', {}>
  | Action<'USER/LOGIN', { userId: string }>;

export const LOGIN_USER = 'USER/LOGIN';
export const LOGOUT_USER = 'USER/LOGOUT';
