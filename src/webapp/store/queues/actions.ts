import gamemodes from '@config/gamemodes';
import app from '@webapp/app';
import { getCurrentRegion } from '@webapp/store/user-id/selectors';
import { AsyncAction } from '@webapp/store';
import emitSocketEvent from '@webapp/utils/emit-socket-event';
import { createNotification } from '@webapp/store/notifications/actions';
import { NotificationType } from '@webapp/store/notifications/types';
import classes from '@config/classes';
import { fetchQueuePlayers } from '@webapp/store/players/actions';

import { QueueActionTypes } from './types';
import maps from '@config/maps';

function fetchQueue(gamemode: keyof typeof gamemodes): AsyncAction {
  return async (dispatch, getState) => {
    dispatch({
      type: QueueActionTypes.START_FETCH,
      payload: { gamemode },
    });

    const state = getState();
    const region = getCurrentRegion(state);
    const queueId = `${region}-${gamemode}`;

    try {
      const queue = await app.service('queues').get(queueId);

      dispatch({
        type: QueueActionTypes.FETCHED,
        payload: { queue },
      });

      await dispatch(fetchQueuePlayers(queueId));
    } catch (error) {
      dispatch({
        type: QueueActionTypes.FETCH_ERROR,
        payload: {
          error,
          gamemode,
        },
      });
    }
  };
}

function joinQueue(
  gamemode: keyof typeof gamemodes,
  className: keyof typeof classes,
): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('queues:join', {
        gamemode,
        class: className,
      });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Couldn't join queue: ${error.message}`,
          2 * 1000,
        ),
      );
    }
  };
}

function leaveQueue(gamemode: keyof typeof gamemodes): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('queues:leave', {
        gamemode,
      });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Couldn't leave queue: ${error.message}`,
          2 * 1000,
        ),
      );
    }
  };
}

function readyUp(gamemode: keyof typeof gamemodes): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('queues:ready-up', {
        gamemode,
      });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Couldn't ready up for queue: ${error.message}`,
          2 * 1000,
        ),
      );
    }
  };
}

function selectMap(gamemode: keyof typeof gamemodes, map: keyof typeof maps): AsyncAction {
  return async (dispatch) => {
    try {
      await emitSocketEvent('queues:select-map', {
        gamemode,
        map,
      });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Couldn't select a map for queue: ${error.message}`,
          2 * 1000,
        ),
      );
    }
  };
}

export {
  fetchQueue,
  joinQueue,
  leaveQueue,
  readyUp,
  selectMap,
};
