import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';
import hooks from 'feathers-hooks-common';
import { Forbidden } from 'feathers-errors';

import { pluck } from '../../../utils/functions';

import schema from './schema';

const log = debug('TF2Pickup:errors');
const getUserId = pluck('params.user.id');

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
      create(hook) {
        if (!hook.params.provider) {
          log('Creating server side error:', hook.data.message);

          return hook;
        }

        const userId = getUserId(hook);

        if (!userId) {
          throw new Forbidden('You are not allowed to create an error!');
        }

        log('Creating client error from user:', userId, hook.data.message);

        return {
          ...hook,
          data: {
            ...hook.data,
            steamId: userId,
          },
        };
      },
      get: hooks.disallow(),
      find: hooks.disallow(),
      update: hooks.disallow(),
      patch: hooks.disallow(),
      remove: hooks.disallow(),
    },
  });
}
