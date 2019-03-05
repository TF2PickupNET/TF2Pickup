import { ServerApp } from '@feathersjs/feathers';
import debug from 'debug';
import service from 'feathers-mongoose';

import Model from './Model';

const log = debug('TF2Pickup:players');

export default function pickupPlayers(app: ServerApp) {
  log('Setting up players service');

  app.use('/players', service({
    id: 'id',
    Model,
  }));

  app
    .service('players')
    .publish('created', () => app.channel('all'))
    .publish('patched', () => app.channel('all'))
    .publish('removed', () => app.channel('all'));
}
