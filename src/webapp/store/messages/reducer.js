// @flow

import {
  type State,
  type Actions,
  CREATE_MESSAGE,
  FETCHED_MESSAGES, REMOVE_MESSAGE,
} from './types';

export default function reducer(state: State = {}, action: Actions) {
  switch (action.type) {
    case CREATE_MESSAGE: return {
      ...state,
      [action.payload.message._id]: action.payload.message,
    };
    case FETCHED_MESSAGES: return {
      ...state,
      ...action.payload.messages.reduce((accu, message) => {
        return {
          ...accu,
          [message._id]: message,
        };
      }, {}),
    };
    case REMOVE_MESSAGE: {
      const {
        [action.payload.messageId]: message,
        ...rest
      } = state;

      return rest;
    }
    default: return state;
  }
}
