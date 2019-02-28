import { ServerApp } from '@feathersjs/feathers';
import service from 'feathers-mongoose';
import Model from '@server/services/pickup-players/Model';
import debug from 'debug';

const log = debug('TF2Pickup:pickup');

function pickups(app: ServerApp) {
  log('Setting up pickup service');

  app.use('/pickups', service({
    id: 'id',
    Model,
  }));
}

export default pickups;
