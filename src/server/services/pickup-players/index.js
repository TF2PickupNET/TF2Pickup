// @flow

import { type App } from '@feathersjs/express';
import service from 'feathers-mongoose';
import debug from 'debug';

import Model from './Model';

const log = debug('TF2Pickup:users');

export default function pickupPlayers(app: App) {
  log('Setting up pickup-players service');

  app.use('/pickup-players', service({
    Model,
    id: 'id',
  }));

  app
    .service('pickup-players')
    .publish('patched', () => app.channel('authenticated'))
    .publish('created', () => app.channel('authenticated'))
    .publish('removed', () => app.channel('authenticated'));
}
