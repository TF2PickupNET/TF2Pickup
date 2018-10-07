// @flow strict-local

import {
  type App,
  type Connection,
} from '@feathersjs/feathers';

declare module '@feathersjs/socketio' {
  declare type Options = {|
    wsEngine?: string,
    path: string,
  |};

  declare export interface SocketConnection {
    feathers: Connection,
  }

  declare export interface IO {
    on(eventname: string, cb: (data: ?{}) => void): IO,
    on('connection', cb: (socket: IO) => void): IO,
    use(cb: (socket: IO, next: () => void) => void): IO,
    emit(eventname: string, data: ?{}): IO,
  }

  declare export default function socket(
    options: Options,
    cb?: (io: IO) => void,
  ): (app: App) => void;
}
