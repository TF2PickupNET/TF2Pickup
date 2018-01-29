import {
  CLOSE_DIALOG,
  OPEN_DIALOG,
} from './constants';

/**
 * Create the action for opening a dialog.
 *
 * @param {String} name - The name of the dialog.
 * @returns {Object} - Returns the action object.
 */
export function openDialog(name) {
  return {
    type: OPEN_DIALOG,
    dialog: name,
  };
}

/**
 * Close the current dialog.
 *
 * @returns {Object} - Returns the action object.
 */
export function closeDialog() {
  return { type: CLOSE_DIALOG };
}
