import {AsyncAction} from "redux";
import {State} from "..";
import {
  Actions,
  FETCH_ERROR_PICKUP_QUEUE,
  FETCHED_PICKUP_QUEUE,
  START_FETCH_PICKUP_QUEUE,
  UPDATE_PICKUP_QUEUE
} from "./types";
import gamemodes from "../../../config/gamemodes";
import app from "../../app";
import {makeGetRegion} from "../users/selectors";
import {getCurrentUserId} from "../user-id/selectors";
import PickupQueue from "../../../types/PickupQueue";
import {makeGetPickupQueueStatus} from "./selectors";
import {AsyncStatus} from "../types";

const getRegion = makeGetRegion();

function fetchPickup(gamemode: keyof typeof gamemodes): AsyncAction<State, Actions> {
  const getPickupQueueStatus = makeGetPickupQueueStatus();

  return async (dispatch, getState) => {
    if (getPickupQueueStatus(getState(), gamemode) !== AsyncStatus.NOT_STARTED) {
      return;
    }

    dispatch({
      type: START_FETCH_PICKUP_QUEUE,
      payload: { gamemode },
    });

    const state = getState();
    const region = getRegion(state, getCurrentUserId(state));

    try {
      const queue = await app.service('pickup-queues').get(`${region}-${gamemode}`);

      dispatch({
        type: FETCHED_PICKUP_QUEUE,
        payload: { queue },
      });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR_PICKUP_QUEUE,
        payload: {
          error,
          gamemode,
        },
      });
    }
  };
}

function updatePickupQueue(queue: PickupQueue): Actions {
  return {
    type: UPDATE_PICKUP_QUEUE,
    payload: { queue },
  };
}

export {
  fetchPickup,
  updatePickupQueue,
};
