import {
  UPDATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from './constants';

/**
 * Create the action object to update the data of the current user.
 *
 * @param {Object} user - The changed data.
 * @returns {Object} - Returns the action object.
 */
export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: { user },
  };
}

/**
 * Create the action object to login a new user.
 *
 * @param {Object} user - The data of the logged in user.
 * @returns {Object} - Returns the action object.
 */
export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: { user },
  };
}

/**
 * Create the action object to logout the current user.
 *
 * @returns {Object} - Returns the action object.
 */
export function logoutUser() {
  return { type: LOGOUT_USER };
}
