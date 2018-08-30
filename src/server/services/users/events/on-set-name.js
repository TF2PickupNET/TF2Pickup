// @flow

import {
  NotAuthenticated,
  BadRequest,
} from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

type Data = { name: string };

const log = debug('TF2Pickup:users:events:on-set-name');

export default function onSetName(app: App, connection: SocketConnection) {
  const users = app.service('users');

  return async ({ name }: Data, cb: (error: null | Error) => void) => {
    const user = connection.feathers.user;

    // Make sure a userId is authenticated
    if (!user) {
      return cb(new NotAuthenticated());
    }

    if (user.name !== null) {
      return cb(new BadRequest('You already have a name'));
    }

    const [existingUser] = await users.find({
      query: {
        name,
        $limit: 1,
      },
    });

    if (existingUser) {
      return cb(new BadRequest('This name is already taken'));
    }

    try {
      await users.patch(user.id, { name });

      return cb(null);
    } catch (error) {
      log('Error while setting userId name', user.id, error);

      return cb(error);
    }
  };
}
