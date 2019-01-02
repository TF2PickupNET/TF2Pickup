import {
  State,
  Actions,
  UPDATE_PICKUP_QUEUE,
  START_FETCH_PICKUP_QUEUE,
  FETCHED_PICKUP_QUEUE,
  FETCH_ERROR_PICKUP_QUEUE,
} from "./types";
import {mapObjectValues} from "../../../utils/object";
import gamemodes from "../../../config/gamemodes";
import {createStateCreator} from "../types";
import PickupQueue from "../../../types/PickupQueue";

const stateCreator = createStateCreator<PickupQueue>();
const defaultState = mapObjectValues(gamemodes, () => stateCreator.createNotStartedState());

export default function reducer(state: State | undefined = defaultState, action: Actions): State {
  switch (action.type) {
    case START_FETCH_PICKUP_QUEUE: {
      return {
        ...state,
        [action.payload.gamemode]: stateCreator.createLoadingState(),
      };
    }
    case FETCHED_PICKUP_QUEUE: {
      return {
        ...state,
        [action.payload.queue.gamemode]: stateCreator.createSuccessState(action.payload.queue),
      };
    }
    case FETCH_ERROR_PICKUP_QUEUE: {
      return {
        ...state,
        [action.payload.gamemode]: stateCreator.createErrorState(action.payload.error),
      };
    }
    case UPDATE_PICKUP_QUEUE: {
      return {
        ...state,
        [action.payload.queue.gamemode]: stateCreator.createSuccessState(action.payload.queue),
      }
    }
    default: {
      return state;
    }
  }
}
