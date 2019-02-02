import { createStateCreator } from '../types';
import UserProfile from '../../../types/UserProfile';

import { UserProfileActionTypes, Actions, State } from './types';

const stateCreator = createStateCreator<UserProfile>();

export default function reducer(state: State | undefined = {}, action: Actions): State {
  switch (action.type) {
    case UserProfileActionTypes.START_FETCH: {
      return {
        ...state,
        [action.payload.userId]: stateCreator.createLoadingState(),
      };
    }
    case UserProfileActionTypes.UPDATE:
    case UserProfileActionTypes.FETCHED: {
      return {
        ...state,
        [action.payload.profile.id]: stateCreator.createFetchedState(action.payload.profile),
      };
    }
    case UserProfileActionTypes.FETCH_ERROR: {
      return {
        ...state,
        [action.payload.userId]: stateCreator.createErrorState(action.payload.error),
      };
    }
    default: {
      return state;
    }
  }
}
