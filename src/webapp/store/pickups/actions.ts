import {
  AsyncAction,
  AsyncStatus,
} from '@webapp/store';
import app from '@webapp/app';
import { PickupActionTypes } from '@webapp/store/pickups/types';
import { makeGetPickupStatusById } from '@webapp/store/pickups/selectors';
import { fetchPickupPlayers } from '@webapp/store/pickup-players/actions';

const pickups = app.service('pickups');
const getPickupStatusById = makeGetPickupStatusById();

function fetchPickup(pickupId: number): AsyncAction {
  return async (dispatch, getState) => {
    const state = getState();
    const status = getPickupStatusById(state, pickupId);

    if (status !== AsyncStatus.NOT_STARTED) {
      return;
    }

    dispatch({
      type: PickupActionTypes.START_FETCH,
      payload: { pickupId },
    });

    try {
      const pickup = await pickups.get(pickupId);

      dispatch({
        type: PickupActionTypes.FETCHED,
        payload: { pickup },
      });

      await dispatch(fetchPickupPlayers(pickupId));
    } catch (error) {
      dispatch({
        type: PickupActionTypes.FETCH_ERROR,
        payload: {
          pickupId,
          error,
        },
      });
    }
  };
}

export { fetchPickup };
