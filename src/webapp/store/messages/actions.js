// @flow

import { message as m } from 'antd';

import app from '../../app';
import { type Message } from '../../../types/Message';

import {
  CREATE_MESSAGE,
  FETCHED_MESSAGES,
  UPDATE_MESSAGE,
  type CreateMessageAction,
  type FetchedMessagesAction,
  type UpdateMessageAction,
} from './types';

function createMessage(message: Message): CreateMessageAction {
  return {
    type: CREATE_MESSAGE,
    payload: { message },
  };
}

function updateMessage(message: Message): UpdateMessageAction {
  return {
    type: UPDATE_MESSAGE,
    payload: { message },
  };
}

function sendMessage(chatId: string, message: string) {
  app.io.emit('messages:create', {
    message,
    chatId,
  }, (err) => {
    if (err) {
      m.error(`Couldn't send your message: ${err.message}`);
    }
  });
}

function fetchMessages(messages: $ReadOnlyArray<Message>): FetchedMessagesAction {
  return {
    type: FETCHED_MESSAGES,
    payload: { messages },
  };
}

export {
  fetchMessages,
  sendMessage,
  updateMessage,
  createMessage,
};

