import { FeathersError } from '@feathersjs/errors';
import { SocketConnection } from '@feathersjs/socketio';

import regions from '../../src/config/regions';
import roles from '../../src/config/roles';
import emojiSets from '../../src/config/emoji-sets';

type Callback = (err: FeathersError<number, string> | null) => void;
type Roles = keyof typeof roles;

interface Events {
  'users:complete-sign-up': null,
  'users:change-region': { region: keyof typeof regions },
  'users:accept-rules': null,
  'users:set-name': { name: string },
  'users:add-role': {
    role: Roles,
    userId: string,
  },
  'users:remove-role': {
    role: Roles,
    userId: string,
  },

  'user-settings:change-volume': { volume: number },
  'user-settings:change-emoji-set': { emojiSet: keyof typeof emojiSets },

  'messages:create': {
    chatId: string,
    message: string,
  },

  'warnings:create': {
    for: string,
    message: string,
  },

  'warnings:mark-as-read': { id: string },
}

interface ClientSocket {
  on(event: 'connect' | 'disconnect', cb: () => void): void,

  emit<Name extends keyof Events>(
    name: Name,
    data: Events[Name],
    cb: Callback,
  ): void,
}

interface ServerSocket extends SocketConnection {
  on<Name extends keyof Events>(
    name: Name,
    handler: (data: Events[Name], cb: Callback) => void | Promise<void>,
  ): void,
}

export {
  Callback,
  Events,
  ServerSocket,
  ClientSocket,
};
