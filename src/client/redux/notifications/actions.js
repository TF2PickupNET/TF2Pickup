import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from './constants';

/**
 * Create a notification action object to add a notification to the store.
 *
 * @param {String} content - The string for the notification.
 * @param {Object} options - Additional options for the notification.
 * @param {Number} [options.autoCloseTimer] - A custom timeout to close the snackbar after.
 * @returns {Object} - Returns the action object.
 */
export function addNotification(content, { autoCloseTimer = 10 * 1000 } = {}) {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      notification: {
        content,
        autoCloseTimer,
      },
    },
  };
}

/**
 * Create a notification action object to remove a notification from the store.
 *
 * @returns {Object} - Returns the action object.
 */
export function removeNotification() {
  return { type: REMOVE_NOTIFICATION };
}
