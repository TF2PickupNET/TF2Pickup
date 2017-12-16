import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';
import hooks from 'feathers-hooks-common';

import schema from './schema';

const log = debug('TF2Pickup:logs');

/**
 * Set up the logs service.
 */
export default function errors() {
  const that = this;

  log('Setting up errors service');

  that.service('errors', service({
    Model: mongoose.model('Errors', schema),
    id: 'id',
  }));

  that.service('errors').hooks({
    before: {
      create: hooks.disallow('external'),
      get: hooks.disallow(),
      find: hooks.disallow(),
      update: hooks.disallow(),
      patch: hooks.disallow(),
      remove: hooks.disallow(),
    },
  });
}
