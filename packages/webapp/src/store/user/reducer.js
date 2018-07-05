// @flow

import {
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
  type State,
  type Actions,
} from './types';

export default function reducer(state: State = null, action: Actions) {
  switch (action.type) {
    case LOGIN_USER: return action.payload.user;
    case LOGOUT_USER: return null;
    case UPDATE_USER: return {
      ...state,
      ...action.payload.user,
    };
    default: return state;
  }
}
