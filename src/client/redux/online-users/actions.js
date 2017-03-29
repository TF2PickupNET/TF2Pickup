import {
  USER_LOGGED_OUT,
  USER_LOGGED_IN,
} from './constants';

export function logoutUser(id) {
  return {
    type: USER_LOGGED_OUT,
    payload: { id },
  };
}

export function loginUser(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user,
  };
}
