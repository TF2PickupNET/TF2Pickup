import { createTypedAsyncItem } from '@webapp/store/utils';
import UserProfile from '@typings/UserProfile';

import { UserProfileActionTypes, Actions, State } from './types';

const asyncItem = createTypedAsyncItem<UserProfile>();

export default function reducer(state: State | undefined = {}, action: Actions): State {
  switch (action.type) {
    case UserProfileActionTypes.START_FETCH: {
      return {
        ...state,
        [action.payload.userId]: asyncItem.createLoadingState(),
      };
    }
    case UserProfileActionTypes.UPDATE:
    case UserProfileActionTypes.FETCHED: {
      return {
        ...state,
        [action.payload.profile.id]: asyncItem.createFetchedState(action.payload.profile),
      };
    }
    case UserProfileActionTypes.FETCH_ERROR: {
      return {
        ...state,
        [action.payload.userId]: asyncItem.createErrorState(action.payload.error),
      };
    }
    default: {
      return state;
    }
  }
}
