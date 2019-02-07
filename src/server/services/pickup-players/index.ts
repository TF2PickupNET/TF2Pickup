import { ServerApp } from '@feathersjs/feathers';
import debug from 'debug';
import service from 'feathers-mongoose';

import Model from './Model';

const log = debug('TF2Pickup:pickup-players');

export default function pickupPlayers() {
  return (app: ServerApp) => {
    log('Setting up pickup players');

    app.use('/pickup-players', service({
      id: 'id',
      Model,
    }));
  };
}
