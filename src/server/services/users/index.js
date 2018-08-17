// @flow

import { type App } from '@feathersjs/express';
import service from 'feathers-mongoose';
import debug from 'debug';

import Model from './Model';
import hooks from './hooks';
import events from './events';

const log = debug('TF2Pickup:users');

export default function users(app: App) {
  log('Setting up users service');

  app.use('/users', service({
    Model,
    id: 'id',
  }));

  app
    .configure(events)
    .service('users')
    .hooks(hooks);
}