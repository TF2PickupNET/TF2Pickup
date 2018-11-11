// @flow

import { type AsyncAction } from 'redux';

import { makeGetRegion } from '../users/selectors';
import { getCurrentUserId } from '../user-id/selectors';
import { gamemodes } from '../../../config';
import { type State } from '../reducers';
import { type PickupQueue } from '../../../types/PickupQueue';
import app from '../../app';

import {
  FETCHED_QUEUE,
  RESET_QUEUES,
  UPDATE_QUEUE,
  type UpdatePickupQueue,
  type ResetPickupQueue,
  type FetchedPickupQueue,
} from './types';

function updateQueue(queue: PickupQueue): UpdatePickupQueue {
  return {
    type: UPDATE_QUEUE,
    payload: { queue },
  };
}

function resetQueues(): ResetPickupQueue {
  return {
    type: RESET_QUEUES,
    payload: {},
  };
}

function fetchedQueue(queue: PickupQueue): FetchedPickupQueue {
  return {
    type: FETCHED_QUEUE,
    payload: { queue },
  };
}

function fetchPickups(): AsyncAction<State> {
  return async (dispatch, getState) => {
    const state = getState();
    const region = makeGetRegion()(state, getCurrentUserId(state));

    if (region === null) {
      return;
    }

    dispatch(resetQueues());

    await Promise.all(Object.keys(gamemodes).map(async (gamemode) => {
      const queue = await app.service('pickup-queues').get(`${region}-${gamemode}`);

      dispatch(fetchedQueue(queue));
    }));
  };
}

export {
  updateQueue,
  fetchPickups,
};
