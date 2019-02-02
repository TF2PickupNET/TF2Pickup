import { createStateCreator } from '../types';
import UserSettings from '../../../types/UserSettings';

import { SettingsActionTypes, Actions, State } from './types';

const stateCreator = createStateCreator<UserSettings>();
const defaultState = stateCreator.createNotStartedState();

export default function reducer(state: State | undefined = defaultState, action: Actions): State {
  switch (action.type) {
    case SettingsActionTypes.START_FETCH: {
      return stateCreator.createLoadingState();
    }
    case SettingsActionTypes.UPDATE:
    case SettingsActionTypes.FETCHED: {
      return stateCreator.createFetchedState(action.payload.settings);
    }
    case SettingsActionTypes.FETCH_FAILED: {
      return stateCreator.createErrorState(action.payload.error);
    }
    default: {
      return state;
    }
  }
}
