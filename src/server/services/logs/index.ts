import { ServerApp } from '@feathersjs/feathers';
import service from 'feathers-mongoose';
import debug from 'debug';

import Model from './Model';

const log = debug('TF2Pickup:logs');

export default function logs() {
  return (app: ServerApp) => {
    log('Setting up logs service');

    app.use('/logs', service({
      Model,
      id: 'id',
    }));
  };
}
