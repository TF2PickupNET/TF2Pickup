import { ServerApp } from '@feathersjs/feathers';
import debug from 'debug';
import service from 'feathers-mongoose';

import Model from './Model';
import setupQueues from './setup-queues';
import events from './events';
import hooks from './hooks';

const log = debug('TF2Pickup:queues');

export default function queues(app: ServerApp) {
  log('Setting up queues');

  app.use('/queues', service({
    id: 'id',
    Model,
  }));

  app
    .configure(setupQueues)
    .configure(events);

  app
    .service('queues')
    .hooks(hooks)
    .publish('patched', queue => app.channel(`region:${queue.region}`));
}
