import { AsyncAction } from 'redux';
import { NotAuthenticated } from '@feathersjs/errors';

import app from '../../app';
import { isString } from '../../../utils/string';

import { State } from '..';

import {
  LOGIN_USER,
  LOGOUT_USER,
  Actions,
} from './types';

function logoutUser(): AsyncAction<State, Actions> {
  return async (dispatch) => {
    await app.logout();

    dispatch({
      type: LOGOUT_USER,
      payload: {},
    });
  };
}

function loginUser(): AsyncAction<State, Actions> {
  return async (dispatch) => {
    const token = window.localStorage.getItem('feathers-jwt');

    if (token === null) {
      return new NotAuthenticated(
        'Missing JWT token!',
      );
    }

    try {
      const { accessToken } = await app.authenticate({
        strategy: 'jwt',
        accessToken: token,
      });

      const { id } = await app.passport.verifyJWT(accessToken);

      if (!isString(id)) {
        return new NotAuthenticated(
          'Missing id field in JWT Payload!',
        );
      }

      dispatch({
        type: LOGIN_USER,
        payload: { userId: id },
      });

      return null;
    } catch (error) {
      return error;
    }
  };
}

export {
  logoutUser,
  loginUser,
};
