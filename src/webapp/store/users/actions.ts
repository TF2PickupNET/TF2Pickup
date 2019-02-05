import app from '@webapp/app';
import regions from '@config/regions';
import roles from '@config/roles';
import {
  AsyncStatus,
  AsyncAction,
} from '@webapp/store';
import emitSocketEvent from '@webapp/utils/emit-socket-event';

import { UsersActionTypes } from './types';
import { makeGetUserStatusById } from './selectors';

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
      console.error('Error while fetching a user', userId, error.message);

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

async function updateRegion(region: keyof typeof regions) {
  try {
    await emitSocketEvent('users:change-region', { region });
  } catch (error) {
    console.log(error);
  }
}

async function setName(name: string) {
  try {
    await emitSocketEvent('users:set-name', { name });
  } catch (error) {
    console.log(error);
  }
}

async function acceptRules() {
  try {
    await emitSocketEvent('users:accept-rules', null);
  } catch (error) {
    console.log(error);
  }
}

async function completeSignUp() {
  try {
    await emitSocketEvent('users:complete-sign-up', null);
  } catch (error) {
    console.log(error);
  }
}

async function addRole(userId: string, role: keyof typeof roles) {
  try {
    await emitSocketEvent('users:add-role', {
      role,
      userId,
    });
  } catch (error) {
    console.log(error);
  }
}

async function removeRole(userId: string, role: keyof typeof roles) {
  try {
    await emitSocketEvent('users:remove-role', {
      role,
      userId,
    });
  } catch (error) {
    console.log(error);
  }
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
