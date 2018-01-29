import {
  CONNECTED,
  DISCONNECTED,
} from './constants';
import setupListeners from './setup-listeners';

/**
 * The reducer for the connected store.
 *
 * @param {Boolean} [state] - The current state.
 * @param {Object} action - The action object.
 * @returns {Boolean} - Returns the new state.
 */
function reducer(state = false, action) {
  switch (action.type) {
    case CONNECTED:
      return true;
    case DISCONNECTED:
      return false;
    default:
      return state;
  }
}

reducer.setupListeners = setupListeners;

export default reducer;
