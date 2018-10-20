// @flow

import {
  type State,
  type Actions,
  FETCHED_CHAT,
  ADD_MESSAGE_TO_CHAT, REMOVE_MESSAGE_FROM_CHAT,
} from './types';

export default function reducer(state: State = {}, action: Actions) {
  switch (action.type) {
    case FETCHED_CHAT: return {
      ...state,
      [action.payload.chat.id]: action.payload.chat,
    };
    case ADD_MESSAGE_TO_CHAT: {
      const chat = state[action.payload.chatId];

      return {
        ...state,
        [action.payload.chatId]: {
          ...chat,
          messages: [
            ...chat.messages,
            action.payload.messageId,
          ],
        },
      };
    }
    case REMOVE_MESSAGE_FROM_CHAT: {
      const chat = state[action.payload.chatId];

      return {
        ...state,
        [action.payload.chatId]: {
          ...chat,
          messages: chat.messages.filter(messageId => messageId !== action.payload.messageId),
        },
      };
    }
    default: return state;
  }
}
