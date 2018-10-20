// @flow

import { type ClientApp } from '@feathersjs/feathers';

import store from '..';

import {
  addMessageToChat,
  removeMessageFromChat,
} from '../chats/actions';
import { type Message } from '../../../types/Message';

import {
  createMessage,
  removeMessage,
} from './actions';

export default function events() {
  return (app: ClientApp) => {
    const messages = app.service('messages');

    messages.on('created', (message: Message) => {
      const state = store.getState();

      if (state.chats[message.chatId]) {
        store.dispatch(createMessage(message));

        store.dispatch(addMessageToChat(message.chatId, message._id));
      }
    });

    messages.on('removed', (message: Message) => {
      const state = store.getState();

      if (state.messages[message._id]) {
        store.dispatch(removeMessage(message._id));

        store.dispatch(removeMessageFromChat(message.chatId, message._id));
      }
    });
  };
}
