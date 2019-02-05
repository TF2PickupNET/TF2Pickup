import { createTypedAsyncItem } from '@webapp/store/utils';
import Configuration from '@typings/Configuration';

import { Actions, State, ConfigActionTypes } from './types';

const asyncItem = createTypedAsyncItem<Configuration>();
const defaultState = asyncItem.createNotStartedState();

export default function reducer(state: State | undefined = defaultState, action: Actions): State {
  switch (action.type) {
    case ConfigActionTypes.START_FETCH: {
      return asyncItem.createLoadingState();
    }
    case ConfigActionTypes.FETCHED: {
      return asyncItem.createFetchedState(action.payload.config);
    }
    case ConfigActionTypes.FETCH_ERROR: {
      return asyncItem.createErrorState(action.payload.error);
    }
    default: {
      return state;
    }
  }
}
