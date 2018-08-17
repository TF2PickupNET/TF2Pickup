// @flow

import { NotAuthenticated } from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type Connection } from '@feathersjs/feathers';
import debug from 'debug';

const log = debug('TF2Pickup:users:events:on-change-region');

export default function onAcceptRules(app: App, connection: Connection) {
  return async (data: {}, cb: (Error | null) => void) => {
    // Make sure a user is authenticated
    if (!connection.user) {
      return cb(new NotAuthenticated());
    }

    try {
      await app.service('users').patch(connection.user.id, { hasAcceptedTheRules: true });

      return cb(null);
    } catch (error) {
      log('Error while accepting the rules', connection.user.id, error);

      return cb(error);
    }
  };
}
