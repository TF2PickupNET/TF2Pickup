import {
  UPDATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from './constants';

const defaultState = null;

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.payload.user;
    case LOGIN_USER:
      return Object.assign({}, state, action.payload.user);
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
}
