// @flow

import { NotAuthenticated } from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type Connection } from '@feathersjs/feathers';
import debug from 'debug';

type Data = { region: string };

const log = debug('TF2Pickup:users:events:on-change-region');

export default function onChangeRegion(app: App, connection: Connection) {
  return async ({ region }: Data, cb: (error: null | Error) => void) => {
    // Make sure a user is authenticated
    if (!connection.user) {
      return cb(new NotAuthenticated());
    }

    const oldRegion = connection.user.region;

    try {
      await app.service('users').patch(connection.user.id, { region });

      // Get every connection for the user
      const connections = app
        .channel(`region:${oldRegion}`)
        .filter(({ user }) => user.id === connection.user.id);

      // Leave the old region channel and join the new one
      connections.connections.forEach((conn) => {
        app.channels(`region:${oldRegion}`).leave(conn);
        app.channels(`region:${region}`).join(conn);
      });

      return cb(null);
    } catch (error) {
      log('Error while changing region', connection.user.id, error);

      return cb(error);
    }
  };
}
