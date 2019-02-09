import gamemodes from '@config/gamemodes';
import app from '@webapp/app';
import { makeGetUserRegion } from '@webapp/store/users/selectors';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import {
  AsyncAction,
  AsyncStatus,
} from '@webapp/store';

import { makeGetPickupQueueStatus } from './selectors';
import { PickupQueueActionTypes } from './types';

const getUserRegion = makeGetUserRegion();

function fetchPickup(gamemode: keyof typeof gamemodes): AsyncAction {
  const getPickupQueueStatus = makeGetPickupQueueStatus();

  return async (dispatch, getState) => {
    if (getPickupQueueStatus(getState(), gamemode) !== AsyncStatus.NOT_STARTED) {
      return;
    }

    dispatch({
      type: PickupQueueActionTypes.START_FETCH,
      payload: { gamemode },
    });

    const state = getState();
    const region = getUserRegion(state, getCurrentUserId(state));

    try {
      const queue = await app.service('pickup-queues').get(`${region}-${gamemode}`);

      dispatch({
        type: PickupQueueActionTypes.FETCHED,
        payload: { queue },
      });
    } catch (error) {
      dispatch({
        type: PickupQueueActionTypes.FETCH_ERROR,
        payload: {
          error,
          gamemode,
        },
      });
    }
  };
}

export { fetchPickup };
