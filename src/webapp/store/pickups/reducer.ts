import {
  State,
  Actions,
  PickupActionTypes,
} from '@webapp/store/pickups/types';
import { createTypedAsyncItem } from '@webapp/store/utils';
import Pickup from '@typings/Pickup';

const asyncItem = createTypedAsyncItem<Pickup>();

function reducer(state: State | undefined = {}, action: Actions): State {
  switch (action.type) {
    case PickupActionTypes.START_FETCH: {
      return {
        ...state,
        [action.payload.pickupId]: asyncItem.createLoadingState(),
      };
    }
    case PickupActionTypes.FETCHED: {
      const { pickup } = action.payload;

      return {
        ...state,
        [pickup.id]: asyncItem.createFetchedState(pickup),
      };
    }
    case PickupActionTypes.FETCH_ERROR: {
      return {
        ...state,
        [action.payload.pickupId]: asyncItem.createErrorState(action.payload.error),
      };
    }
    case PickupActionTypes.UPDATE: {
      const { pickup } = action.payload;

      return {
        ...state,
        [pickup.id]: asyncItem.createFetchedState(pickup),
      };
    }
    default:
      return state;
  }
}

export default reducer;
