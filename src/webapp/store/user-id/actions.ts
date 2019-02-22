import { NotAuthenticated } from '@feathersjs/errors';
import app from '@webapp/app';
import { AsyncAction } from '@webapp/store';
import { isString } from '@utils/string';
import { fetchUser } from '@webapp/store/users/actions';
import { fetchSettings } from '@webapp/store/settings/actions';
import { fetchProfile } from '@webapp/store/user-profiles/actions';

import { UserIdActionTypes } from './types';
import { createNotification } from '@webapp/store/notifications/actions';
import { NotificationType } from '@webapp/store/notifications/types';

function logoutUser(): AsyncAction {
  return async (dispatch) => {
    await app.logout();

    dispatch({
      type: UserIdActionTypes.LOGOUT,
      payload: null,
    });
  };
}

function loginUser(): AsyncAction {
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

      dispatch(
        createNotification(
          NotificationType.SUCCESS,
          'Logged in',
          1000,
        ),
      );

      return null;
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Error while authenticating with our server: ${error.message}`,
          2 * 1000,
        ),
      );

      return error;
    }
  };
}

export {
  logoutUser,
  loginUser,
};
