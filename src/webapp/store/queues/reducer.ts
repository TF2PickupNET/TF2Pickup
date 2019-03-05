import { mapObjectValues } from '@utils/object';
import gamemodes from '@config/gamemodes';
import { createTypedAsyncItem } from '@webapp/store/utils';
import Queue from '@typings/Queue';

import {
  State,
  Actions,
  QueueActionTypes,
} from './types';

const asyncItem = createTypedAsyncItem<Queue>();
const defaultState = mapObjectValues(gamemodes, () => asyncItem.createNotStartedState());

export default function reducer(state: State | undefined = defaultState, action: Actions): State {
  switch (action.type) {
    case QueueActionTypes.START_FETCH: {
      return {
        ...state,
        [action.payload.gamemode]: asyncItem.createLoadingState(),
      };
    }
    case QueueActionTypes.UPDATE:
    case QueueActionTypes.FETCHED: {
      return {
        ...state,
        [action.payload.queue.gamemode]: asyncItem.createFetchedState(action.payload.queue),
      };
    }
    case QueueActionTypes.FETCH_ERROR: {
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
