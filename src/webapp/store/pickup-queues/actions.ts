import gamemodes from '@config/gamemodes';
import app from '@webapp/app';
import { getCurrentRegion } from '@webapp/store/user-id/selectors';
import { AsyncAction } from '@webapp/store';
import emitSocketEvent from '@webapp/utils/emit-socket-event';
import { createNotification } from '@webapp/store/notifications/actions';
import { NotificationType } from '@webapp/store/notifications/types';
import classes from '@config/classes';
import { fetchQueuePlayers } from '@webapp/store/players/actions';

import { PickupQueueActionTypes } from './types';
import maps from '@config/maps';

function fetchPickupQueue(gamemode: keyof typeof gamemodes): AsyncAction {
  return async (dispatch, getState) => {
    dispatch({
      type: PickupQueueActionTypes.START_FETCH,
      payload: { gamemode },
    });

    const state = getState();
    const region = getCurrentRegion(state);
    const queueId = `${region}-${gamemode}`;

    try {
      const queue = await app.service('pickup-queues').get(queueId);

      dispatch({
        type: PickupQueueActionTypes.FETCHED,
        payload: { queue },
      });

      await dispatch(fetchQueuePlayers(queueId));
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

function joinPickupQueue(
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

function leavePickupQueue(gamemode: keyof typeof gamemodes): AsyncAction {
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

function selectMap(gamemode: keyof typeof gamemodes, map: keyof typeof maps): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('pickup-queues:select-map', {
        gamemode,
        map,
      });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Couldn't select a map for pickup queue: ${error.message}`,
          2 * 1000,
        ),
      );
    }
  };
}

export {
  fetchPickupQueue,
  joinPickupQueue,
  leavePickupQueue,
  readyUp,
  selectMap,
};
