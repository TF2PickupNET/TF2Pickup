import randomString from 'randomstring';
import ms from 'ms';

import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from './constants';

/**
 * Create a notification action object to add a notification to the store.
 *
 * @param {String} text - The string for the notification.
 * @param {Object} options - Additional options for the notification.
 * @param {String} [options.id] - A custom id to use rather than a randomly generated.
 * @param {String} [options.timeout] - A custom timeout to close the snackbar after.
 * @returns {Object} - Returns the action object.
 */
export function addNotification(text, {
  id = randomString.generate(),
  timeout = '10s',
} = {}) {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      notification: {
        id,
        text,
        timeout: ms(timeout),
      },
    },
  };
}

/**
 * Create a notification action object to remove a notification from the store.
 *
 * @param {String} id - The id to remove.
 * @returns {Object} - Returns the action object.
 */
export function removeNotification(id) {
  return {
    type: REMOVE_NOTIFICATION,
    payload: { id },
  };
}
