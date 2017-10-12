import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';

import schema from './schema';
import hooks from './hooks';
import filters from './filters';
import setupDb from './setup-db';
import socketMethods from './socket-methods';

const log = debug('TF2Pickup:pickup-queue');

/**
 * Set up the logs service.
 */
export default function pickupQueue() {
  const that = this;

  log('Setting up pickup-queue service');

  that.service('pickup-queue', service({
    Model: mongoose.model('PickupQueue', schema),
    id: 'id',
  }));

  that.service('pickup-queue').hooks(hooks);
  that.service('pickup-queue').filter(filters);

  setupDb(that.service('pickup-queue'));

  that.on('listening', () => {
    that.io.on('connection', socket => socketMethods(that, socket));
  });
}
