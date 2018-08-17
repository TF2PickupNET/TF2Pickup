// @flow

import {
  SET_CONFIG,
  type State,
  type Actions,
} from './types';

export default function reducer(state: State = null, action: Actions) {
  switch (action.type) {
    case SET_CONFIG: return action.payload.config;
    default: return state;
  }
}
