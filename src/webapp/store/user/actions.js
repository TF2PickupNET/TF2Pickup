// @flow

import { type User } from '../../../types';

import {
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
} from './types';

export function loginUser(user: User) {
  return {
    type: LOGIN_USER,
    payload: { user },
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: null,
  };
}

export function updateUser(user: User) {
  return {
    type: UPDATE_USER,
    payload: { user },
  };
}
