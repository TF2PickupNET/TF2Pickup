// @flow

import { NotAuthenticated } from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

type Data = {
  queueId: string,
  class: string,
};

const log = debug('TF2Pickup:pickup-queue:events:on-join');

export default function onJoin(app: App, connection: SocketConnection) {
  const pickupQueue = app.service('pickup-queue');
  const pickupPlayers = app.service('pickup-players');

  return async (data: Data, cb: (Error | null) => void) => {
    const currentUser = connection.feathers.user;

    if (!currentUser) {
      return cb(new NotAuthenticated());
    }

    try {
      const queue = await pickupQueue.get(data.queueId);
      const players = await Promise.all(queue.players.map(playerId => pickupPlayers.get(playerId)));
      const existingPlayer = players.find(({ userId }) => userId === currentUser.id);

      if (existingPlayer) {
        await pickupPlayers.patch(existingPlayer.id, { $set: { class: data.class } });

        log('User successfully switched classes', {
          data,
          userId: currentUser.id,
        });
      } else {
        const player = await pickupPlayers.create({
          userId: currentUser.id,
          map: null,
          data: data.class,
        });

        await pickupQueue.patch(data.queueId, { $push: { players: player.id } });

        log('User successfully joined pickup', {
          data,
          userId: currentUser.id,
        });
      }

      return cb(null);
    } catch (error) {
      log('Error while joining pickup queue', {
        userId: currentUser.id,
        data,
        error,
      });

      return cb(error);
    }
  };
}
