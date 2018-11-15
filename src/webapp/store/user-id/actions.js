// @flow

import { type AsyncAction } from 'redux';
import { message } from 'antd';

import app from '../../app';

import { type State } from '..';

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

function authenticate(cb: (success: boolean) => void): AsyncAction<State> {
  return async (dispatch) => {
    try {
      const { accessToken } = await app.authenticate({
        strategy: 'jwt',
        accessToken: window.localStorage.getItem('feathers-jwt'),
      });

      const { id } = await app.passport.verifyJWT(accessToken);

      message.success('Successfully authenticated');

      cb(true);

      dispatch(loginUser(id));
    } catch (error) {
      message.warn(`Couldn't authenticate. ${error.message}`);

      cb(false);
    }
  };
}

export {
  loginUser,
  logoutUser,
  authenticate,
};
