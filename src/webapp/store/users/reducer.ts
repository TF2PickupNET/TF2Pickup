import { createTypedAsyncItem } from '@webapp/store/utils';
import User from '@typings/User';

import {
  UsersActionTypes, State, Actions,
} from './types';

const asyncItem = createTypedAsyncItem<User>();

export default function reducer(state: State | undefined = {}, action: Actions): State {
  switch (action.type) {
    case UsersActionTypes.START_FETCH: {
      return {
        ...state,
        [action.payload.userId]: asyncItem.createLoadingState(),
      };
    }
    case UsersActionTypes.FETCH_FAILED: {
      return {
        ...state,
        [action.payload.userId]: asyncItem.createErrorState(action.payload.error),
      };
    }
    case UsersActionTypes.UPDATE:
    case UsersActionTypes.FETCHED: {
      return {
        ...state,
        [action.payload.user.id]: asyncItem.createFetchedState(action.payload.user),
      };
    }
    default: {
      return state;
    }
  }
}
