import {
  UPDATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from './constants';
import setupListeners from './setup-listeners';

/**
 * The reducer for the currently logged in user.
 *
 * @param {Object} [state] - The current state.
 * @param {Object} action - The action object.
 * @returns {Object} - Returns the new state.
 */
function reducer(state = null, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload.user;
    case UPDATE_USER:
      return Object.assign({}, state, action.payload.user);
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
}

reducer.setupListeners = setupListeners;

export default reducer;
