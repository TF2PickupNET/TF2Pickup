// @flow

import { type App } from '@feathersjs/express';
import service from 'feathers-mongoose';
import debug from 'debug';

import Model from '../users/Model';
import hooks from '../users/hooks';

const log = debug('TF2Pickup:user-settings');

export default function userSettings(app: App) {
  log('Setting up user-settings service');

  app.use('/user-settings', service({
    Model,
    id: 'id',
  }));

  app
    .service('user-settings')
    .hooks(hooks);
}
