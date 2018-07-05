// @flow

import { type App } from '@feathersjs/express';
import service from 'feathers-mongoose';
import debug from 'debug';

import Model from './Model';
import hooks from './hooks';
import setupEvents from './setup-events';

const log = debug('TF2Pickup:user-profile');

export default function userProfile(app: App) {
  log('Setting up user-profile service');

  app.use('/user-profile', service({
    Model,
    id: 'id',
  }));

  app
    .configure(setupEvents)
    .service('user-profile')
    .hooks(hooks);
}
