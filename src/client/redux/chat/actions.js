import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  REPLACE_MESSAGES,
} from './constants';

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: {
      chat: message.chat,
      message,
    },
  };
}

export function removeMessage(chat, messageId) {
  return {
    type: REMOVE_MESSAGE,
    payload: {
      chat,
      messageId,
    },
  };
}

export function replaceMessages(chat, messages) {
  return {
    type: REPLACE_MESSAGES,
    payload: {
      chat,
      messages,
    },
  };
}
