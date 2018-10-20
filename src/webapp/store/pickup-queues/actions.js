// @flow

import { type ClientApp } from '@feathersjs/feathers';
import { type Dispatch } from 'redux';

import { makeGetRegion } from '../users/selectors';
import { getCurrentUserId } from '../user-id/selectors';
import { gamemodes } from '../../../config';
import { type State } from '../reducers';
import { type PickupQueue } from '../../../types/PickupQueue';

import {
  FETCHED_QUEUE,
  RESET_QUEUES,
  type Actions, UPDATE_QUEUE,
} from './types';

export function fetchPickups() {
  return async (dispatch: Dispatch<Actions>, getState: () => State, app: ClientApp) => {
    const state = getState();
    const region = makeGetRegion()(state, getCurrentUserId(state));

    if (region === null) {
      return;
    }

    dispatch({
      type: RESET_QUEUES,
      payload: {},
    });

    await Promise.all(Object.keys(gamemodes).map(async (gamemode) => {
      const queue = await app.service('pickup-queues').get(`${region}-${gamemode}`);

      dispatch({
        type: FETCHED_QUEUE,
        payload: {
          gamemode,
          queue,
        },
      });
    }));
  };
}

export function updateQueue(queue: PickupQueue) {
  return {
    type: UPDATE_QUEUE,
    payload: { queue },
  };
}
