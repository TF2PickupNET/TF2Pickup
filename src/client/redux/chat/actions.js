import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  REPLACE_MESSAGES,
} from './constants';

/**
 * Create the action object for adding a message to the state.
 *
 * @param {Object} message - The message object.
 * @returns {Object} - Returns the action object.
 */
export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: {
      chat: message.chat,
      message,
    },
  };
}

/**
 * Create a action object for removing a message.
 *
 * @param {String} messageId - The Id of the message.
 * @param {String} chat - The chat to remove the message from.
 * @returns {Object} - Returns the action object.
 */
export function removeMessage(messageId, chat) {
  return {
    type: REMOVE_MESSAGE,
    payload: {
      messageId,
      chat,
    },
  };
}

/**
 * Create the action object for completely replace the messages.
 *
 * @param {String} chat - The chat to replace the messages for.
 * @param {Object} messages - The message object.
 * @returns {Object} - Returns the action object.
 */
export function replaceMessages(chat, messages) {
  return {
    type: REPLACE_MESSAGES,
    payload: {
      chat,
      messages,
    },
  };
}
