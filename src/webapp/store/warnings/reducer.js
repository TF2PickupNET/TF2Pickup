// @flow

import {
  ADD_WARNING,
  UPDATE_WARNING,
  type Actions,
  type State,
} from './types';

export default function reducer(state: State = {}, action: Actions) {
  switch (action.type) {
    case ADD_WARNING: {
      const { warning } = action.payload;

      return {
        ...state,
        [warning._id]: warning,
      };
    }
    case UPDATE_WARNING: {
      const { warning } = action.payload;

      return {
        ...state,
        [warning._id]: {
          ...state[warning._id],
          ...warning,
        },
      };
    }
    default: return state;
  }
}
