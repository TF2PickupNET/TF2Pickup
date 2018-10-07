// @flow

import { type App } from '@feathersjs/express';
import service from 'feathers-mongoose';
import debug from 'debug';

import Model from './Model';

const log = debug('TF2Pickup:logs');

export default function logs(app: App) {
  log('Setting up logs service');

  app.use('/logs', service({
    Model,
    id: 'id',
  }));
}
