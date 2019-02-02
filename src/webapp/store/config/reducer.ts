import { createStateCreator } from '../types';
import Configuration from 'types/Configuration';

import { Actions, State, ConfigActionTypes } from './types';

const stateCreator = createStateCreator<Configuration>();
const defaultState = stateCreator.createNotStartedState();

export default function reducer(state: State | undefined = defaultState, action: Actions): State {
  switch (action.type) {
    case ConfigActionTypes.START_FETCH: {
      return stateCreator.createLoadingState();
    }
    case ConfigActionTypes.FETCHED: {
      return stateCreator.createSuccessState(action.payload.config);
    }
    case ConfigActionTypes.FETCH_ERROR: {
      return stateCreator.createErrorState(action.payload.error);
    }
    default: {
      return state;
    }
  }
}
