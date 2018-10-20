// @flow

import {
  NotAuthenticated,
  BadRequest,
} from '@feathersjs/errors';
import { type ServerApp } from '@feathersjs/feathers';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

import { type Message } from '../../../../types/Message';

const log = debug('TF2Pickup:messages:on-create-message');

export default function onCreateMessage(app: ServerApp, connection: SocketConnection) {
  const messages = app.service('messages');
  const chats = app.service('chats');

  return async (data: Message, cb: (error: Error | null) => void) => {
    const { user } = connection.feathers;

    if (!user) {
      return cb(new NotAuthenticated());
    }

    try {
      const chat = await chats.get(data.chatId);

      if (!chat) {
        return cb(new BadRequest('A chat with the provided chatId does not exist!'));
      }

      const message = await messages.create(data);

      log('Created new message', {
        userId: user.id,
        data: { message },
      });

      return cb(null);
    } catch (error) {
      log('Error while creating new message', {
        userId: user.id,
        data,
        error,
      });

      return cb(error);
    }
  };
}
