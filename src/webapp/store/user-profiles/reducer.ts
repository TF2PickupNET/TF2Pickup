import { createStateCreator } from '../types';
import UserProfile from '../../../types/UserProfile';

import {
  UPDATE_PROFILE,
  START_FETCH_PROFILE,
  FETCH_ERROR_PROFILE,
  FETCHED_PROFILE,
  Actions,
  State,
} from './types';

const stateCreator = createStateCreator<UserProfile>();

export default function reducer(state: State | undefined = {}, action: Actions): State {
  switch (action.type) {
    case START_FETCH_PROFILE: {
      return {
        ...state,
        [action.payload.userId]: stateCreator.createLoadingState(),
      };
    }
    case FETCHED_PROFILE: {
      return {
        ...state,
        [action.payload.profile.id]: stateCreator.createSuccessState(action.payload.profile),
      };
    }
    case FETCH_ERROR_PROFILE: {
      return {
        ...state,
        [action.payload.userId]: stateCreator.createErrorState(action.payload.error),
      };
    }
    case UPDATE_PROFILE: {
      return {
        ...state,
        [action.payload.profile.id]: stateCreator.createSuccessState(action.payload.profile),
      };
    }
    default: {
      return state;
    }
  }
}
