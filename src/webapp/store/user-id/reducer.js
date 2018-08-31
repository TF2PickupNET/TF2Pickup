// @flow

import {
  LOGIN_USER,
  LOGOUT_USER,
  type State,
  type Actions,
} from './types';

// $FlowFixMe: We require a logged in user
export default function reducer(state: State = null, action: Actions) {
  switch (action.type) {
    case LOGIN_USER: return action.payload.userId;
    case LOGOUT_USER: return null;
    default: return state;
  }
}
