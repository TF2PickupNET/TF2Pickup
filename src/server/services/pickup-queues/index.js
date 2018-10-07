// @flow

import { type App } from '@feathersjs/express';
import service from 'feathers-mongoose';
import debug from 'debug';

import setup from './setup';
import Model from './Model';
import events from './events';

const log = debug('TF2Pickup:users');

export default function pickupQueues(app: App) {
  log('Setting up pickup-queues service');

  app.use('/pickup-queues', service({
    Model,
    id: 'id',
  }));

  app
    .configure(setup)
    .configure(events)
    .service('pickup-queues')
    .publish('patched', data => app.channel(`region:${data.region}`));
}
