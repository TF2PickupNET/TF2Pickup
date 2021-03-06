import { AsyncAction } from '@webapp/store';
import { PickupPlayerActionTypes } from '@webapp/store/players/types';
import app from '@webapp/app';
import Player from '@typings/Player';
import { createNotification } from '@webapp/store/notifications/actions';
import { NotificationType } from '@webapp/store/notifications/types';

function fetchPlayers(id: string | number, query: Partial<Player>): AsyncAction {
  return async (dispatch) => {
    dispatch({
      type: PickupPlayerActionTypes.FETCH_PLAYERS,
      payload: { id },
    });

    try {
      const players = await app.service('players').find({ query });

      console.log(players);

      dispatch({
        type: PickupPlayerActionTypes.FETCHED_PLAYERS,
        payload: {
          id,
          players,
        },
      });
    } catch (error) {
      dispatch(
        createNotification(
          NotificationType.ERROR,
          `Error while fetching players: ${error.name}`,
          2 * 1000,
        )
      );
    }
  };
}

function fetchPickupPlayers(pickupId: number) {
  return fetchPlayers(pickupId, {
    pickupId,
    queueId: null,
  });
}

function fetchQueuePlayers(queueId: string) {
  return fetchPlayers(queueId, {
    queueId,
    pickupId: null,
  });
}

export {
  fetchPickupPlayers,
  fetchQueuePlayers,
};
