// @flow

import { type App } from '@feathersjs/express';
import service from 'feathers-mongoose';
import debug from 'debug';

import setup from './setup';
import Model from './model';

const log = debug('TF2Pickup:users');

export default function pickupQueue(app: App) {
  log('Setting up pickup-queue service');

  app.use('/pickup-queue', service({
    Model,
    id: 'id',
  }));

  app
    .configure(setup)
    .service('pickup-queue')
    .publish('patched', () => app.channel('authenticated'));
}
