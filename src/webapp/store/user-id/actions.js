// @flow

import app from '../../app';

import {
  LOGIN_USER,
  LOGOUT_USER,
} from './types';

export function loginUser(userId: string) {
  return {
    type: LOGIN_USER,
    payload: { userId },
  };
}

export function logoutUser() {
  app.logout();

  return {
    type: LOGOUT_USER,
    payload: {},
  };
}
