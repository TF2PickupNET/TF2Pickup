import { createStateCreator } from '../types';
import Configuration from '../../../types/Configuration';

import {
  State,
  Actions,
  START_FETCH_CONFIG,
  FETCHED_CONFIG,
  FETCH_ERROR_CONFIG,
} from './types';

const stateCreator = createStateCreator<Configuration>();
const defaultState = stateCreator.createNotStartedState();

export default function reducer(state: State | undefined = defaultState, action: Actions): State {
  switch (action.type) {
    case START_FETCH_CONFIG: {
      return stateCreator.createLoadingState();
    }
    case FETCHED_CONFIG: {
      return stateCreator.createSuccessState(action.payload.config);
    }
    case FETCH_ERROR_CONFIG: {
      return stateCreator.createErrorState(action.payload.error);
    }
    default: {
      return state;
    }
  }
}
