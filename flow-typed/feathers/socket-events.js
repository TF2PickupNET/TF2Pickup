// @flow

import { type FeathersError } from '@feathersjs/errors';
import { type SocketConnection } from '@feathersjs/socketio';

import { regions } from '../../src/config';

type Callback = (err: FeathersError) => void;

export interface ClientSocket {
  on('connect', cb: () => void): void,
  on('disconnect', cb: () => void): void,
  emit('users:change-region', data: { region: $Keys<typeof regions> }, cb: Callback): void,
  emit('users:accept-rules', data: {}, cb: Callback): void,
  emit('users:set-name', data: { name: string }, cb: Callback): void,
  emit('user-settings:change-volume', data: { volume: number }, cb: Callback): void,
}

export interface ServerSocket extends SocketConnection {
  on(
    'users:change-region',
    (data: { region: $Keys<typeof regions> }, cb: Callback) => void | Promise<void>,
  ): void,
  on(
    'users:accept-rules',
    (data: {}, cb: Callback) => void | Promise<void>,
  ): void,
  on(
    'users:set-name',
    (data: { name: string }, cb: Callback) => void | Promise<void>,
  ): void,
  on(
    'user-settings:change-volume',
    (data: { volume: number }, cb: Callback) => void | Promise<void>,
  ): void,
}
