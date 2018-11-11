// @flow

import { type ClientApp } from '@feathersjs/feathers';

import store from '..';

import { type Message } from '../../../types/Message';

import {
  createMessage,
  updateMessage,
} from './actions';

export default function events() {
  return (app: ClientApp) => {
    const messages = app.service('messages');

    messages.on('created', (message: Message) => {
      const state = store.getState();

      if (state.chats[message.chatId]) {
        store.dispatch(createMessage(message));
      }
    });

    messages.on('patched', (message: Message) => {
      const state = store.getState();

      if (state.messages[message._id]) {
        store.dispatch(updateMessage(message));
      }
    });
  };
}
