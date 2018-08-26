// @flow

import {
  ADD_USER,
  UPDATE_USER,
  type State,
  type Actions,
} from './types';

const defaultState = [];

export default function reducer(state: State = defaultState, action: Actions) {
  switch (action.type) {
    case ADD_USER: {
      if (state[action.payload.user.id]) {
        return state;
      }

      return {
        ...state,
        [action.payload.user.id]: action.payload.user,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        [action.payload.user.id]: {
          ...state[action.payload.user.id],
          ...action.payload.user,
        },
      };
    }
    default: return state;
  }
}
