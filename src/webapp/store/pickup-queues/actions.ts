import gamemodes from '@config/gamemodes';
import app from '@webapp/app';
import { makeGetUserRegion } from '@webapp/store/users/selectors';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import { AsyncAction, AsyncStatus } from '@webapp/store';

import { makeGetPickupQueueStatus } from './selectors';
import { PickupQueueActionTypes } from './types';
import emitSocketEvent from '@webapp/utils/emit-socket-event';
import { createNotification } from '@webapp/store/notifications/actions';
import { NotificationType } from '@webapp/store/notifications/types';
import classes from '@config/classes';

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

function joinPickup(
  gamemode: keyof typeof gamemodes,
  className: keyof typeof classes,
): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('pickup-queues:join', {
        gamemode,
        class: className,
      });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Couldn't join pickup queue: ${error.message}`,
          2 * 1000,
        ),
      );
    }
  };
}

function leavePickup(gamemode: keyof typeof gamemodes): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('pickup-queues:leave', {
        gamemode,
      });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Couldn't leave pickup queue: ${error.message}`,
          2 * 1000,
        ),
      );
    }
  };
}

function readyUp(gamemode: keyof typeof gamemodes): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('pickup-queues:ready-up', {
        gamemode,
      });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Couldn't ready up for pickup queue: ${error.message}`,
          2 * 1000,
        ),
      );
    }
  };
}

export {
  fetchPickup,
  joinPickup,
  leavePickup,
  readyUp,
};
