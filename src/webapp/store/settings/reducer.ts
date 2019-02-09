import { createTypedAsyncItem } from '@webapp/store/utils';
import UserSettings from '@typings/UserSettings';

import {
  SettingsActionTypes, Actions, State,
} from './types';

const asyncItem = createTypedAsyncItem<UserSettings>();
const defaultState = asyncItem.createNotStartedState();

export default function reducer(state: State | undefined = defaultState, action: Actions): State {
  switch (action.type) {
    case SettingsActionTypes.START_FETCH: {
      return asyncItem.createLoadingState();
    }
    case SettingsActionTypes.UPDATE:
    case SettingsActionTypes.FETCHED: {
      return asyncItem.createFetchedState(action.payload.settings);
    }
    case SettingsActionTypes.FETCH_FAILED: {
      return asyncItem.createErrorState(action.payload.error);
    }
    default: {
      return state;
    }
  }
}
