import {
  ADD_MESSAGE,
  REPLACE_MESSAGES,
} from './constants';
import setupListeners from './setup-listeners';

/**
 * The reducer for the chat state.
 *
 * @param {Object} [state] - The current state.
 * @param {Object} action - The action object.
 * @returns {Object} - Returns the new state.
 */
function reducer(state = {}, action) {
  switch (action.type) {
    case ADD_MESSAGE: {
      return {
        ...state,
        [action.payload.chat]: {
          ...state[action.payload.chat],
          [action.payload.message._id]: action.payload.message,
        },
      };
    }
    case REPLACE_MESSAGES: {
      return {
        ...state,
        [action.payload.chat]: action.payload.messages,
      };
    }
    default: return state;
  }
}

reducer.setupListeners = setupListeners;

export default reducer;
