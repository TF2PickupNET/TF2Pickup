import {
  FETCHED_USER,
  FETCH_FAILED,
  STARTED_FETCH_USER,
  UPDATE_USER,
  State,
  Actions,
} from './types';
import {createStateCreator} from "../types";
import User from "../../../types/User";

const stateCreator = createStateCreator<User>();

export default function reducer(state: State | undefined = {}, action: Actions): State {
  switch (action.type) {
    case STARTED_FETCH_USER: {
      return {
        ...state,
        [action.payload.userId]: stateCreator.createLoadingState(),
      };
    }
    case FETCH_FAILED: {
      return {
        ...state,
        [action.payload.userId]: stateCreator.createErrorState(action.payload.error),
      };
    }
    case FETCHED_USER: {
      return {
        ...state,
        [action.payload.user.id]: stateCreator.createSuccessState(action.payload.user),
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        [action.payload.user.id]: stateCreator.createSuccessState(action.payload.user),
      };
    }
    default: {
      return state;
    }
  }
}
