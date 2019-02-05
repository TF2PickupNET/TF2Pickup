import app from '@webapp/app';
import {
  AsyncStatus,
  AsyncAction,
} from '@webapp/store';

import { UserProfileActionTypes } from './types';
import { makeGetProfileStatusById } from './selectors';

const getProfileStatus = makeGetProfileStatusById();

function fetchProfile(userId: string | null): AsyncAction {
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
