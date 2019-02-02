import { createStateCreator } from '../types';
import User from '../../../types/User';

import { UsersActionTypes, State, Actions } from './types';

const stateCreator = createStateCreator<User>();

export default function reducer(state: State | undefined = {}, action: Actions): State {
  switch (action.type) {
    case UsersActionTypes.START_FETCH: {
      return {
        ...state,
        [action.payload.userId]: stateCreator.createLoadingState(),
      };
    }
    case UsersActionTypes.FETCH_FAILED: {
      return {
        ...state,
        [action.payload.userId]: stateCreator.createErrorState(action.payload.error),
      };
    }
    case UsersActionTypes.UPDATE:
    case UsersActionTypes.FETCHED: {
      return {
        ...state,
        [action.payload.user.id]: stateCreator.createFetchedState(action.payload.user),
      };
    }
    default: {
      return state;
    }
  }
}
