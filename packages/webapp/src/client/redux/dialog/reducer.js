import {
  CLOSE_DIALOG,
  OPEN_DIALOG,
} from './constants';

const levels = {
  NO_CONNECTION_DIALOG: 1000,
  POST_USER_CREATION_DIALOG: 900,
  READY_UP_DIALOG: 500,
  MAP_VOTE_DIALOG: 250,
  null: -1,
};

/**
 * The reducer for the dialog state.
 *
 * @param {Boolean} [state] - The current state.
 * @param {Object} action - The action object that was dispatched.
 * @returns {Boolean} - Returns the new state.
 */
export default function reducer(state = null, action) {
  switch (action.type) {
    case OPEN_DIALOG: {
      if (levels[action.dialog] > levels[state]) {
        return action.dialog;
      }

      return state;
    }
    case CLOSE_DIALOG: return null;
    default: return state;
  }
}
