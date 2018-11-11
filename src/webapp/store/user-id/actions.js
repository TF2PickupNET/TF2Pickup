// @flow

import { message } from 'antd';

import app from '../../app';

import {
  LOGIN_USER,
  LOGOUT_USER,
  type LoginUserAction,
  type LogoutUserAction,
} from './types';

function loginUser(userId: string): LoginUserAction {
  return {
    type: LOGIN_USER,
    payload: { userId },
  };
}

function logoutUser(): LogoutUserAction {
  app.logout();

  return {
    type: LOGOUT_USER,
    payload: {},
  };
}

async function authenticate() {
  try {
    await app.authenticate({
      strategy: 'jwt',
      accessToken: window.localStorage.getItem('feathers-jwt'),
    });

    return true;
  } catch (error) {
    message.warn(`Couldn't authenticate. ${error.message}`);

    window.localStorage.removeItem('feathers-jwt');

    throw error;
  }
}

export {
  loginUser,
  logoutUser,
  authenticate,
};
