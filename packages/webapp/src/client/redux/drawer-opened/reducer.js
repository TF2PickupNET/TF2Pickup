import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
} from './constants';

/**
 * The reducer for the drawer opened state.
 *
 * @param {Boolean} [state] - The current state.
 * @param {Object} action - The action object.
 * @returns {Boolean} - Returns the new state.
 */
export default function reducer(state = false, action) {
  switch (action.type) {
    case OPEN_DRAWER:
      return true;
    case CLOSE_DRAWER:
      return false;
    default: return state;
  }
}
