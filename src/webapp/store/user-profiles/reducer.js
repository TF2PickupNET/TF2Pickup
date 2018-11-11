// @flow

import {
  ADD_PROFILE,
  UPDATE_PROFILE,
  type Actions,
  type State,
} from './types';

export default function reducer(state: State = {}, action: Actions) {
  switch (action.type) {
    case ADD_PROFILE: {
      if (state[action.payload.profile.id]) {
        return state;
      }

      return {
        ...state,
        [action.payload.profile.id]: action.payload.profile,
      };
    }
    case UPDATE_PROFILE: {
      return {
        ...state,
        [action.payload.profile.id]: {
          ...state[action.payload.profile.id],
          ...action.payload.profile,
        },
      };
    }
    default: return state;
  }
}
