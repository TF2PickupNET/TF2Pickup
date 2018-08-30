// @flow

import { NotAuthenticated } from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

type Data = { region: string };

const log = debug('TF2Pickup:users:events:on-change-region');

export default function onChangeRegion(app: App, connection: SocketConnection) {
  return async ({ region }: Data, cb: (error: null | Error) => void) => {
    const user = connection.feathers.user;

    // Make sure a userId is authenticated
    if (!user) {
      return cb(new NotAuthenticated());
    }

    const oldRegion = user.region;

    try {
      await app.service('users').patch(user.id, { region });

      // Get every connection for the userId
      const connections = app
        .channel(`region:${oldRegion}`)
        .filter(conn => conn.user.id === user.id);

      // Leave the old region channel and join the new one
      connections.connections.forEach((conn) => {
        app.channels(`region:${oldRegion}`).leave(conn);
        app.channels(`region:${region}`).join(conn);
      });

      return cb(null);
    } catch (error) {
      log('Error while changing region', user.id, error);

      return cb(error);
    }
  };
}
