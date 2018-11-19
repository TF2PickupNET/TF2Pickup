// @flow

import {
  type State,
  type Actions,
  SET_HAS_UPDATE,
} from './types';

export default function reducer(state: State = false, action: Actions) {
  switch (action.type) {
    case SET_HAS_UPDATE: return action.payload.hasUpdate;
    default: return state;
  }
}

