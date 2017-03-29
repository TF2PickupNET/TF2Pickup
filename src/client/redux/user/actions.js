import {
  UPDATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from './constants';

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: { user },
  };
}

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: { user },
  };
}

export function logoutUser() {
  return { type: LOGOUT_USER };
}
