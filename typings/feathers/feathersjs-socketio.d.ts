declare module '@feathersjs/socketio' {
  import {
    ServerApp,
    Connection,
    ServerSocket,
  } from '@feathersjs/feathers';

  interface Options {
    wsEngine?: string,
    path: string,
  }

  export interface SocketConnection {
    feathers: Connection,
  }

  export interface Socket {
    on(eventname: 'connection', cb: (socket: ServerSocket) => void): Socket,
    on(eventname: string, cb: (data?: object) => void): Socket,
    use(cb: (socket: Socket, next: () => void) => void): Socket,
    emit(eventname: string, data?: object): Socket,
  }

  export default function socket(
    options: Options,
    cb?: (socket: Socket) => void,
  ): (app: ServerApp) => void;
}
