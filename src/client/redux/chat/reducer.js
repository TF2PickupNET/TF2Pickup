import { omit } from '../../../utils/functions';

import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  REPLACE_MESSAGES,
} from './constants';
import setupListeners from './setup-listeners';

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
    case REMOVE_MESSAGE: {
      return {
        ...state,
        [action.payload.chat]: omit(action.payload.messageId)(state[action.payload.chat]),
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
