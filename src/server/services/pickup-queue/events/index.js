// @flow

import { type App } from '@feathersjs/express';

import onLeave from './on-leave';
import onJoin from './on-join';
import onReadyUp from './on-ready-up';

export default function events(app: App) {
  app.on('socket-connection', (socket) => {
    socket.on('pickup-queue:join', onJoin(app, socket));

    socket.on('pickup-queue:leave', onLeave(app, socket));

    socket.on('pickup-queue:ready-up', onReadyUp(app, socket));

    socket.on('pickup-queue:select-map', onAddRole(app, socket));
  });
}
