import { ServerApp } from '@feathersjs/feathers';
import debug from 'debug';

import onJoin from './on-join';
import onLeave from './on-leave';
import onReadyUp from './on-ready-up';
import onSelectMap from './on-select-map';

const log = debug('TF2Pickup:pickup-queues:events');

export default function events(app: ServerApp) {
  log('Setting up events for the pickup-queues service');

  app.on('socket-connection', (socket) => {
    socket.on('queues:join', onJoin(app, socket));

    socket.on('queues:leave', onLeave(app, socket));

    socket.on('queues:ready-up', onReadyUp(app, socket));

    socket.on('queues:select-map', onSelectMap(app, socket));
  });
}
