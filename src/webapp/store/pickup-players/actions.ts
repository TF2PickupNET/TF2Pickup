import { AsyncAction } from '@webapp/store';
import { PickupPlayerActionTypes } from '@webapp/store/pickup-players/types';
import app from '@webapp/app';
import PickupPlayer from '@typings/PickupPlayer';

function fetchPlayers(id: string | number, query: Partial<PickupPlayer>): AsyncAction {
  const pickupPlayers = app.service('pickup-players');

  return async (dispatch) => {
    dispatch({
      type: PickupPlayerActionTypes.FETCH_PLAYERS,
      payload: { id },
    });

    try {
      const players = await pickupPlayers.find({ query });

      dispatch({
        type: PickupPlayerActionTypes.FETCHED_PLAYERS,
        payload: {
          id,
          players,
        },
      });
    } catch (error) {
      console.warn('HEllo');
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
