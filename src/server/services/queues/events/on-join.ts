import { NotAuthenticated } from '@feathersjs/errors';
import {
  ServerApp,
  SocketEventHandler,
} from '@feathersjs/feathers';
import { SocketConnection } from '@feathersjs/socketio';
import mongoose from 'mongoose';
import debug from 'debug';
import getPlayer from '@server/services/queues/utils/get-player';
import checkForUpdateState from '@server/services/queues/check-for-update-state';

const log = debug('TF2Pickup:pickup-queues:events:on-join');

export default function onJoin(
  app: ServerApp,
  connection: SocketConnection,
): SocketEventHandler<'queues:join'> {
  const queues = app.service('queues');
  const players = app.service('players');

  return async (data, cb) => {
    const { user } = connection.feathers;

    // Make sure a userId is authenticated
    if (!user) {
      return cb(new NotAuthenticated('You aren\'t authenticated!'));
    }

    const {
      region,
      id: userId,
    } = user;
    const queueId = `${region}-${data.gamemode}`;

    try {
      const queue = await queues.get(queueId);
      const player = await getPlayer(app, queueId, userId);

      if (player) {
        await players.patch(player.id, { class: data.class });
      } else {
        await players.create({
          id: new mongoose.Types.ObjectId().toHexString(),
          userId,
          queueId,
          map: null,
          isReady: queue.state === 'ready-up',
          isSubbed: false,
          pickupId: null,
          joinedOn: Date.now(),
          class: data.class,
        });
      }

      await checkForUpdateState(app, queue);

      return cb(null);
    } catch (error) {
      log('Error while player wanted to join pickup queue', {
        error,
        userId,
        data,
      });

      return cb(error);
    }
  };
}
