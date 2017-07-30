import {
  USER_LOGGED_OUT,
  USER_LOGGED_IN,
} from './constants';

/**
 * Create the action object to log out a user.
 *
 * @param {String} id - The id of the user.
 * @returns {Object} - Returns the action object.
 */
export function logoutUser(id) {
  return {
    type: USER_LOGGED_OUT,
    payload: { id },
  };
}

/**
 * Create the action object to login a user.
 *
 * @param {Object} user - The users data.
 * @returns {Object} - Returns the action object.
 */
export function loginUser(user) {
  return {
    type: USER_LOGGED_IN,
    payload: { user },
  };
}
