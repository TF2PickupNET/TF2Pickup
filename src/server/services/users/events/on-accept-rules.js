// @flow

import { NotAuthenticated } from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

const log = debug('TF2Pickup:users:events:on-change-region');

export default function onAcceptRules(app: App, connection: SocketConnection) {
  const users = app.service('users');

  return async (data: {}, cb: (Error | null) => void) => {
    const user = connection.feathers.user;

    // Make sure a userId is authenticated
    if (!user) {
      return cb(new NotAuthenticated('You aren\'t authenticated!'));
    }

    try {
      await users.patch(user.id, { hasAcceptedTheRules: true });

      return cb(null);
    } catch (error) {
      log('Error while accepting the rules', user.id, error);

      return cb(error);
    }
  };
}
