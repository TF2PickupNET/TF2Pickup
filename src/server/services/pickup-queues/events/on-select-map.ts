import { NotAuthenticated, BadRequest } from '@feathersjs/errors';
import {
  ServerApp,
  SocketEventHandler,
} from '@feathersjs/feathers';
import { SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';
import getPlayer from '@server/services/pickup-queues/utils/get-player';

const log = debug('TF2Pickup:pickup-queues:events:on-select-map');

export default function onSelectMap(
  app: ServerApp,
  connection: SocketConnection,
): SocketEventHandler<'pickup-queues:select-map'> {
  const queues = app.service('pickup-queues');
  const players = app.service('pickup-players');

  return async (data, cb) => {
    const { user } = connection.feathers;

    // Make sure a userId is authenticated
    if (!user) {
      return cb(new NotAuthenticated('You aren\'t authenticated!'));
    }

    const { region, id: userId } = user;
    const queueId = `${region}-${data.gamemode}`;

    try {
      const queue = await queues.get(queueId);
      const player = await getPlayer(app, queueId, userId);

      if (player === null) {
        return cb(new BadRequest());
      }

      if (!queue.maps.includes(data.map)) {
        return cb(new BadRequest());
      }

      await players.patch(player.id, { map: data.map });

      return cb(null);
    } catch (error) {
      log('Error while player select map for pickup queue', {
        error,
        userId,
        data,
      });

      return cb(error);
    }
  };
}
