// @flow

import { type Action } from 'redux';

import { type User } from '../../../types';

type State = { [key: string]: User };
type Actions = Action<'USERS/UPDATE', { user: User }>
  | Action<'USERS/ADD', { user: User }>;

const UPDATE_USER = 'USERS/UPDATE';
const ADD_USER = 'USERS/ADD';

export type {
  State,
  Actions,
};
export {
  UPDATE_USER,
  ADD_USER,
};
