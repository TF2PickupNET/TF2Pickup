import {
  NotAuthenticated, BadRequest,
} from '@feathersjs/errors';
import {
  ServerApp,
  SocketEventHandler,
} from '@feathersjs/feathers';
import { SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';
import getPlayer from '@server/services/pickup-queues/utils/get-player';

const log = debug('TF2Pickup:pickup-queues:events:on-leave');

export default function onLeave(
  app: ServerApp,
  connection: SocketConnection,
): SocketEventHandler<'pickup-queues:leave'> {
  const players = app.service('players');

  return async (data, cb) => {
    const { user } = connection.feathers;

    // Make sure a userId is authenticated
    if (!user) {
      return cb(new NotAuthenticated('You aren\'t authenticated!'));
    }

    const {
      region, id: userId,
    } = user;
    const queueId = `${region}-${data.gamemode}`;

    try {
      const player = await getPlayer(app, queueId, userId);

      if (player === null) {
        return cb(new BadRequest());
      }

      await players.remove(player.id);

      return cb(null);
    } catch (error) {
      log('Error while player wanted to leave pickup queue', {
        error,
        userId,
        data,
      });

      return cb(error);
    }
  };
}
