import randomString from 'randomstring';
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from './constants';

/**
 * Create a notification action object to add a notification to the store.
 *
 * @param {String} text - The string for the notification.
 * @param {Number} [timeout] - The timeout after which the notification should disappear.
 * @returns {Object} - Returns the action object.
 */
export function addNotification(text, timeout = null) {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      notification: {
        id: randomString.generate(),
        text,
        timeout,
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
