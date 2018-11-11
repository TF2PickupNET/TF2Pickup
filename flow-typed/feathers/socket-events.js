// @flow

import { type FeathersError } from '@feathersjs/errors';
import { type SocketConnection } from '@feathersjs/socketio';

import {
  regions,
  roles,
} from '../../src/config';

declare type Callback = (err: FeathersError | null) => void;
declare type Roles = $Keys<typeof roles>;

declare type Events = {
  'users:complete-sign-up': {},
  'users:change-region': { region: $Keys<typeof regions> },
  'users:accept-rules': {},
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

  'messages:create': {
    chatId: string,
    message: string,
  },
};

declare interface ClientSocket {
  on('connect', cb: () => void): void,
  on('disconnect', cb: () => void): void,

  emit<Name: $Keys<Events>>(
    name: Name,
    data: $ElementType<Events, Name>,
    cb: Callback,
  ): void,
}

declare interface ServerSocket extends SocketConnection {
  on<Name: $Keys<Events>>(
    name: Name,
    handler: (data: $ElementType<Events, Name>, cb: Callback) => void | Promise<void>,
  ): void,
}

export type {
  ServerSocket,
  ClientSocket,
};
