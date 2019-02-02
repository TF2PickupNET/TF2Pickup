import { AsyncAction } from 'redux';

import gamemodes from 'config/gamemodes';
import app from '../../app';
import { makeGetUserRegion } from '../users/selectors';
import { getCurrentUserId } from '../user-id/selectors';
import PickupQueue from 'types/PickupQueue';
import { AsyncStatus } from '../types';

import { State } from '..';

import { makeGetPickupQueueStatus } from './selectors';
import { Actions, PickupQueueActionTypes } from './types';

const getUserRegion = makeGetUserRegion();

function fetchPickup(gamemode: keyof typeof gamemodes): AsyncAction<State, Actions> {
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

export {
  fetchPickup,
  updatePickupQueue,
};
