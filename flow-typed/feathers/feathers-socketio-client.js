// @flow strict-local

import { type App } from '@feathersjs/feathers';
import { type Socket } from 'socket.io-client';

declare module '@feathersjs/socketio-client' {
  declare type Options = { timeout: number };

  declare export default function socketio(socket: Socket, options?: Options): (app: App) => void;
}
