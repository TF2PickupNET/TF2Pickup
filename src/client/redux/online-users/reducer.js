import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
} from './constants';

const defaultState = [];

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return state.concat([action.payload]);
    case USER_LOGGED_OUT:
      return state.filter(user => user.id === action.payload.id);
    default:
      return state;
  }
}
