declare module '@feathersjs/socketio-client' {
  import { ClientApp } from '@feathersjs/feathers';
  import io from 'socket.io-client';

  interface Options { timeout: number }

  export default function socketio(
    socket: ReturnType<typeof io>,
    options?: Options,
  ): (app: ClientApp) => void;
}
