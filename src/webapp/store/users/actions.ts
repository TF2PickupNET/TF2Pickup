import app from '@webapp/app';
import regions from '@config/regions';
import roles from '@config/roles';
import { AsyncStatus, AsyncAction } from '@webapp/store';
import emitSocketEvent from '@webapp/utils/emit-socket-event';

import { UsersActionTypes } from './types';
import { makeGetUserStatusById } from './selectors';
import { createNotification } from '@webapp/store/notifications/actions';
import { NotificationType } from '@webapp/store/notifications/types';

const getUserStatus = makeGetUserStatusById();

function fetchUser(userId: string | null): AsyncAction {
  return async (dispatch, getState) => {
    const status = getUserStatus(getState(), userId);

    if (userId === null || status !== AsyncStatus.NOT_STARTED) {
      return;
    }

    dispatch({
      type: UsersActionTypes.START_FETCH,
      payload: { userId },
    });

    try {
      const user = await app.service('users').get(userId);

      dispatch({
        type: UsersActionTypes.FETCHED,
        payload: { user },
      });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Error while fetching a user ${userId}: ${error.message}`,
          4 * 1000,
        ),
      );

      dispatch({
        type: UsersActionTypes.FETCH_FAILED,
        payload: {
          error,
          userId,
        },
      });
    }
  };
}

function updateRegion(region: keyof typeof regions): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('users:change-region', { region });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Error while updating region: ${error.message}`,
          4 * 1000,
        ),
      );
    }
  };
}

function setName(name: string): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('users:set-name', { name });
    } catch (error) {
      console.log(error);
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Error while setting your name: ${error.message}`,
          4 * 1000,
        ),
      );
    }
  };
}

function acceptRules(): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('users:accept-rules', null);
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Error while accepting your rules: ${error.message}`,
          4 * 1000,
        ),
      );
    }
  };
}

function completeSignUp(): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('users:complete-sign-up', null);
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Error while completing sign up: ${error.message}`,
          4 * 1000,
        ),
      );
    }
  };
}

function addRole(userId: string, role: keyof typeof roles): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('users:add-role', {
        role,
        userId,
      });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Error while adding role ${role}: ${error.message}`,
          4 * 1000,
        ),
      );
    }
  };
}

function removeRole(userId: string, role: keyof typeof roles): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('users:remove-role', {
        role,
        userId,
      });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Error while removing role ${role}: ${error.message}`,
          4 * 1000,
        ),
      );
    }
  };
}

export {
  completeSignUp,
  acceptRules,
  updateRegion,
  setName,
  fetchUser,
  addRole,
  removeRole,
};
