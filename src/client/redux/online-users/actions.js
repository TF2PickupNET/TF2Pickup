import {
  UPDATE_ALL_USERS,
  USER_CAME_ONLINE,
  USER_WENT_OFFLINE,
} from './constants';

/**
 * The action object for when a user logs in.
 *
 * @param {Object} user - The user that logged in.
 * @returns {Object} - Returns the action object.
 */
export function userCameOnline(user) {
  return {
    type: USER_CAME_ONLINE,
    payload: { user },
  };
}

/**
 * The action object for when a user logs out.
 *
 * @param {String} id - The user that logged out.
 * @returns {Object} - Returns the action object.
 */
export function userWentOffline(id) {
  return {
    type: USER_WENT_OFFLINE,
    payload: { id },
  };
}

/**
 * Update all the users when the user lost connection and regains it or when
 * he changed his region setting.
 *
 * @param {Object} users - The users to replace the state with.
 * @returns {Object} - Returns the action object.
 */
export function updateAllUsers(users) {
  return {
    type: UPDATE_ALL_USERS,
    payload: { users },
  };
}
