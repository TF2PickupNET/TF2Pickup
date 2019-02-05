import { mapObjectValues } from '@utils/object';
import gamemodes from '@config/gamemodes';
import { createTypedAsyncItem } from '@webapp/store/utils';
import PickupQueue from '@typings/PickupQueue';

import { State, Actions, PickupQueueActionTypes } from './types';

const asyncItem = createTypedAsyncItem<PickupQueue>();
const defaultState = mapObjectValues(gamemodes, () => asyncItem.createNotStartedState());

export default function reducer(state: State | undefined = defaultState, action: Actions): State {
  switch (action.type) {
    case PickupQueueActionTypes.START_FETCH: {
      return {
        ...state,
        [action.payload.gamemode]: asyncItem.createLoadingState(),
      };
    }
    case PickupQueueActionTypes.UPDATE:
    case PickupQueueActionTypes.FETCHED: {
      return {
        ...state,
        [action.payload.queue.gamemode]: asyncItem.createFetchedState(action.payload.queue),
      };
    }
    case PickupQueueActionTypes.FETCH_ERROR: {
      return {
        ...state,
        [action.payload.gamemode]: asyncItem.createErrorState(action.payload.error),
      };
    }
    default: {
      return state;
    }
  }
}
