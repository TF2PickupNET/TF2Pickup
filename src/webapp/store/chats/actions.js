// @flow

import { type ClientApp } from '@feathersjs/feathers';
import { type Dispatch } from 'redux';

import { type State } from '../reducers';
import { fetchMessages } from '../messages/actions';
import { type Actions as MessagesActions } from '../messages/types';

import {
  FETCHED_CHAT,
  type Actions, ADD_MESSAGE_TO_CHAT, REMOVE_MESSAGE_FROM_CHAT,
} from './types';

export function fetchChat(chatId: string) {
  return async (
    dispatch: Dispatch<Actions | MessagesActions>,
    getState: () => State,
    app: ClientApp,
  ) => {
    const [
      chat,
      messages,
    ] = await Promise.all([
      app.service('chats').get(chatId),
      app.service('messages').find({
        query: { chatId },
        $limit: 40,
      }),
    ]);

    dispatch({
      type: FETCHED_CHAT,
      payload: {
        chat: {
          ...chat,
          messages: messages.map(message => message._id),
        },
      },
    });

    dispatch(fetchMessages(messages));
  };
}

export function addMessageToChat(chatId: string, messageId: string) {
  return {
    type: ADD_MESSAGE_TO_CHAT,
    payload: {
      chatId,
      messageId,
    },
  };
}

export function removeMessageFromChat(chatId: string, messageId: string) {
  return {
    type: REMOVE_MESSAGE_FROM_CHAT,
    payload: {
      chatId,
      messageId,
    },
  };
}
