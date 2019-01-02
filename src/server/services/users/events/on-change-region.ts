import { NotAuthenticated } from '@feathersjs/errors';
import {ServerApp, SocketEventHandler} from '@feathersjs/feathers';
import { SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

const log = debug('TF2Pickup:users:events:on-change-region');

export default function onChangeRegion(
  app: ServerApp,
  connection: SocketConnection,
): SocketEventHandler<'users:change-region'> {
  return async (data, cb) => {
    const user = connection.feathers.user;

    // Make sure a userId is authenticated
    if (!user) {
      return cb(new NotAuthenticated());
    }

    const oldRegion = user.region;

    try {
      await app.service('users').patch(user.id, { region: data.region });

      // Get every connection for the user
      const connections = app
        .channel(`region:${oldRegion}`)
        .filter(conn => conn.user.id === user.id);

      // Leave the old region channel and join the new one
      connections.connections.forEach((conn) => {
        app.channel(`region:${oldRegion}`).leave(conn);
        app.channel(`region:${data.region}`).join(conn);
      });

      log('Successfully changed the region', {
        userId: user.id,
        data,
      });

      return cb(null);
    } catch (error) {
      log('Error while changing region', {
        userId: user.id,
        error,
        data,
      });

      return cb(error);
    }
  };
}
