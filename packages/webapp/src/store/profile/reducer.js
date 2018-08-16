// @flow

import {
  SET_PROFILE,
  UPDATE_PROFILE,
  type Actions,
  type State,
} from './types';

export default function reducer(state: State = null, action: Actions) {
  switch (action.type) {
    case SET_PROFILE: return action.payload.profile;
    case UPDATE_PROFILE: {
      return {
        ...state,
        ...action.payload.profile,
      };
    }
    default: return state;
  }
}
