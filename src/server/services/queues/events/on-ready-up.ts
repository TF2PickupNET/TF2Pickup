import {
  NotAuthenticated, BadRequest,
} from '@feathersjs/errors';
import {
  ServerApp,
  SocketEventHandler,
} from '@feathersjs/feathers';
import { SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';
import getPlayer from '@server/services/queues/utils/get-player';
import { QueueStates } from '@config/queue-states';
import checkForUpdateState from '@server/services/queues/check-for-update-state';

const log = debug('TF2Pickup:pickup-queues:events:on-select-map');

export default function onReadyUp(
  app: ServerApp,
  connection: SocketConnection,
): SocketEventHandler<'queues:ready-up'> {
  const queues = app.service('queues');
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
      const queue = await queues.get(queueId);
      const player = await getPlayer(app, queueId, userId);

      if (player === null || queue.state !== QueueStates.ReadyUp) {
        return cb(new BadRequest());
      }

      await players.patch(player.id, { isReady: true });

      await checkForUpdateState(app, queue);

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
