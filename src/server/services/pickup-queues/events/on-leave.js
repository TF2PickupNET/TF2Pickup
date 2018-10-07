// @flow

import {
  BadRequest,
  NotAuthenticated,
} from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

import { getPlayerById } from '../utils/get-player';

type Data = { queueId: string };

const log = debug('TF2Pickup:pickup-queues:events:on-leave');

export default function onLeave(app: App, connection: SocketConnection) {
  const pickupQueue = app.service('pickup-queues');
  const pickupPlayers = app.service('pickup-players');

  return async (data: Data, cb: (Error | null) => void) => {
    const currentUser = connection.feathers.user;

    if (!currentUser) {
      return cb(new NotAuthenticated());
    }

    try {
      const queue = await pickupQueue.get(data.queueId);
      const player = await getPlayerById(app, queue.players, currentUser.id);

      if (player === null) {
        return cb(new BadRequest('You are not in the pickup'));
      }

      const filteredPlayers = queue.players.filter(id => id !== player.id);

      await pickupPlayers.remove(player.id);
      await pickupQueue.patch(data.queueId, { $set: { players: filteredPlayers } });

      log('Player left pickup', {
        data,
        userId: currentUser.id,
      });

      return cb(null);
    } catch (error) {
      log('Error while leaving pickup queue', {
        data,
        userId: currentUser.id,
        error,
      });

      return cb(error);
    }
  };
}
