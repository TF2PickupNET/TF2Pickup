// @flow

import { type ServerApp } from '@feathersjs/feathers';

import onCreateMessage from './on-create-message';

export default function events(app: ServerApp) {
  app.on('socket-connection', (socket) => {
    socket.on('messages:create', onCreateMessage(app, socket));
  });
}
