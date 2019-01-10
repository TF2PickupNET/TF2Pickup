import { createStateCreator } from '../types';
import UserSettings from '../../../types/UserSettings';

import {
  UPDATE_SETTINGS,
  FETCH_FAILED_SETTINGS,
  FETCHED_SETTINGS,
  START_FETCH_SETTINGS,
  Actions,
  State,
} from './types';

const stateCreator = createStateCreator<UserSettings>();
const defaultState = stateCreator.createNotStartedState();

export default function reducer(state: State | undefined = defaultState, action: Actions): State {
  switch (action.type) {
    case START_FETCH_SETTINGS: {
      return stateCreator.createLoadingState();
    }
    case FETCHED_SETTINGS: {
      return stateCreator.createSuccessState(action.payload.settings);
    }
    case FETCH_FAILED_SETTINGS: {
      return stateCreator.createErrorState(action.payload.error);
    }
    case UPDATE_SETTINGS: {
      return stateCreator.createSuccessState(action.payload.settings);
    }
    default: {
      return state;
    }
  }
}
