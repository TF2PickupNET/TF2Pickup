// @flow

import {
  BadRequest,
  NotAuthenticated,
} from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

type Data = { queueId: string };

const log = debug('TF2Pickup:pickup-queue:events:on-leave');

export default function onLeave(app: App, connection: SocketConnection) {
  const pickupQueue = app.service('pickup-queue');
  const pickupPlayers = app.service('pickup-players');

  return async (data: Data, cb: (Error | null) => void) => {
    const currentUser = connection.feathers.user;

    if (!currentUser) {
      return cb(new NotAuthenticated());
    }

    try {
      const queue = await pickupQueue.get(data.queueId);
      const players = await Promise.all(queue.players.map(id => pickupPlayers.get(id)));
      const player = players.find(({ userId }) => userId === currentUser.id);
      const filteredPlayers = queue.players.filter(id => id !== player.id);

      if (filteredPlayers.length === queue.players.length) {
        return cb(
          new BadRequest('Couldn\'t remove player from pickup because he wasn\'t in the pickup.'),
        );
      }

      await pickupPlayers.remove(player.id);
      await pickupQueue.patch(data.queueId, { $set: { players: filteredPlayers } });

      log('User left pickup successfully', {
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
