import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';

import schema from './schema';
import setupDb from './setup-db';

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

  setupDb(that.service('pickup-queue'));
}
