import { mapObjectValues } from 'utils/object';
import gamemodes from 'config/gamemodes';
import { createStateCreator } from '../types';
import PickupQueue from 'types/PickupQueue';

import { State, Actions, PickupQueueActionTypes } from './types';

const stateCreator = createStateCreator<PickupQueue>();
const defaultState = mapObjectValues(gamemodes, () => stateCreator.createNotStartedState());

export default function reducer(state: State | undefined = defaultState, action: Actions): State {
  switch (action.type) {
    case PickupQueueActionTypes.START_FETCH: {
      return {
        ...state,
        [action.payload.gamemode]: stateCreator.createLoadingState(),
      };
    }
    case PickupQueueActionTypes.UPDATE:
    case PickupQueueActionTypes.FETCHED: {
      return {
        ...state,
        [action.payload.queue.gamemode]: stateCreator.createSuccessState(action.payload.queue),
      };
    }
    case PickupQueueActionTypes.FETCH_ERROR: {
      return {
        ...state,
        [action.payload.gamemode]: stateCreator.createErrorState(action.payload.error),
      };
    }
    default: {
      return state;
    }
  }
}
