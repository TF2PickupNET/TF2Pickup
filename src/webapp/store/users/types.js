// @flow

import { type Action } from 'redux';

import { type User } from '../../../types/User';

type State = { [key: string]: User };
type UpdateUserAction = Action<'USERS/UPDATE', { user: User }>;
type AddUserAction = Action<'USERS/ADD', { user: User }>;
type Actions = AddUserAction | UpdateUserAction;

const UPDATE_USER = 'USERS/UPDATE';
const ADD_USER = 'USERS/ADD';

export type {
  State,
  Actions,
  AddUserAction,
  UpdateUserAction,
};

export {
  UPDATE_USER,
  ADD_USER,
};
