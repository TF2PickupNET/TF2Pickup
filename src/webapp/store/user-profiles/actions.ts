import { AsyncAction } from 'redux';

import app from '../../app';
import { AsyncStatus } from '../types';

import { State } from '..';

import {
  Actions,
  UserProfileActionTypes,
} from './types';
import { makeGetProfileStatusById } from './selectors';

const getProfileStatus = makeGetProfileStatusById();

function fetchProfile(userId: string | null): AsyncAction<State, Actions> {
  return async (dispatch, getState) => {
    const status = getProfileStatus(getState(), userId);

    if (userId === null || status !== AsyncStatus.NOT_STARTED) {
      return;
    }

    dispatch({
      type: UserProfileActionTypes.START_FETCH,
      payload: { userId },
    });

    try {
      const profile = await app.service('user-profiles').get(userId);

      dispatch({
        type: UserProfileActionTypes.FETCHED,
        payload: { profile },
      });
    } catch (error) {
      dispatch({
        type: UserProfileActionTypes.FETCH_ERROR,
        payload: {
          userId,
          error,
        },
      });
    }
  };
}

export { fetchProfile };
