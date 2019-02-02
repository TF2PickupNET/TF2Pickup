import { AsyncAction } from 'redux';
import { NotAuthenticated } from '@feathersjs/errors';

import app from '../../app';
import { isString } from '../../../utils/string';

import { State } from '..';

import { UserIdActionTypes, Actions } from './types';
import { fetchUser } from '../users/actions';
import { fetchSettings } from '../settings/actions';
import { fetchProfile } from '../user-profiles/actions';

function logoutUser(): AsyncAction<State, Actions> {
  return async (dispatch) => {
    await app.logout();

    dispatch({
      type: UserIdActionTypes.LOGOUT,
      payload: {},
    });
  };
}

function loginUser(): AsyncAction<State, Actions> {
  return async (dispatch) => {
    const token = window.localStorage.getItem('feathers-jwt');

    if (token === null) {
      return new NotAuthenticated('Missing JWT token!');
    }

    try {
      const { accessToken } = await app.authenticate({
        strategy: 'jwt',
        accessToken: token,
      });

      const { id } = await app.passport.verifyJWT(accessToken);

      if (!isString(id)) {
        return new NotAuthenticated('Missing id field in JWT Payload!');
      }

      dispatch({
        type: UserIdActionTypes.LOGIN,
        payload: { userId: id },
      });

      await Promise.all([
        dispatch(fetchUser(id)),
        dispatch(fetchSettings()),
        dispatch(fetchProfile(id)),
      ]);

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
