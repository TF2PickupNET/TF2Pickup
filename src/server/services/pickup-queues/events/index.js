// @flow

import { type App } from '@feathersjs/express';

import onLeave from './on-leave';
import onJoin from './on-join';
import onReadyUp from './on-ready-up';
import onSelectMap from './on-select-map';

export default function events(app: App) {
  app.on('socket-connection', (socket) => {
    socket.on('pickup-queues:join', onJoin(app, socket));

    socket.on('pickup-queues:leave', onLeave(app, socket));

    socket.on('pickup-queues:ready-up', onReadyUp(app, socket));

    socket.on('pickup-queues:select-map', onSelectMap(app, socket));
  });
}
