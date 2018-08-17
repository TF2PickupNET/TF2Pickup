// @flow strict-local

import { type App } from '@feathers/feathers';
import { type Socket } from 'socket.io-client';

declare module 'socket.io-client' {
  declare export interface Socket {}

  declare type Options = {
    path: string,
    transports: $ReadOnlyArray<string>,
    reconnectionDelay: number,
    reconnectionDelayMax: number,
    timeout: number,
  };

  declare export default function io(url: string, options: Options): Socket;
}

declare module '@feathersjs/socketio-client' {
  declare type Options = { timeout: number };

  declare export default function socketio(socket: Socket, options?: Options): (app: App) => void;
}
