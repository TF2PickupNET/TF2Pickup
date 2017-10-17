import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';

import schema from './schema';
import logListener from './log-listener';

const log = debug('TF2Pickup:pickup');

/**
 * Set up the logs service.
 */
export default function pickup() {
  const that = this;

  log('Setting up pickup service');

  that.service('pickup', service({
    Model: mongoose.model('Pickup', schema),
    id: 'id',
  }));

  logListener(that);
}
