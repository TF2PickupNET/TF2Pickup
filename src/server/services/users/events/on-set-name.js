// @flow

import {
  NotAuthenticated,
  BadRequest,
} from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type Connection } from '@feathersjs/feathers';
import debug from 'debug';

type Data = { name: string };

const log = debug('TF2Pickup:users:events:on-set-name');

export default function onSetName(app: App, connection: Connection) {
  return async ({ name }: Data, cb: (error: null | Error) => void) => {
    // Make sure a user is authenticated
    if (!connection.user) {
      return cb(new NotAuthenticated());
    }

    if (connection.user.name !== null) {
      return cb(new BadRequest('You already have a name'));
    }

    try {
      await app.service('users').patch(connection.user.id, { name });

      return cb(null);
    } catch (error) {
      log('Error while changing region', connection.user.id, error);

      return cb(error);
    }
  };
}
