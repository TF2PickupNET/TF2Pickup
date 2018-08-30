// @flow

import {
  UPDATE_SETTINGS,
  SET_SETTINGS,
  type Actions,
  type State,
} from './types';

export default function reducer(state: State = null, action: Actions) {
  switch (action.type) {
    case SET_SETTINGS: return action.payload.settings;
    case UPDATE_SETTINGS: {
      return {
        ...state,
        ...action.payload.settings,
      };
    }
    default: return state;
  }
}
