// @flow

import { NotAuthenticated } from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

import { getPlayerById } from '../utils/get-player';

type Data = {
  queueId: string,
  class: string,
};

const log = debug('TF2Pickup:pickup-queues:events:on-join');

export default function onJoin(app: App, connection: SocketConnection) {
  const pickupQueue = app.service('pickup-queues');
  const pickupPlayers = app.service('pickup-players');

  return async (data: Data, cb: (Error | null) => void) => {
    const { user } = connection.feathers;

    if (!user) {
      return cb(new NotAuthenticated());
    }

    try {
      const queue = await pickupQueue.get(data.queueId);
      const existingPlayer = await getPlayerById(app, queue.players, user.id);

      if (existingPlayer) {
        await pickupPlayers.patch(existingPlayer.id, { $set: { class: data.class } });

        log('User switched classes', {
          data,
          userId: user.id,
        });
      } else {
        const player = await pickupPlayers.create({
          userId: user.id,
          map: null,
          class: data.class,
        });

        await pickupQueue.patch(data.queueId, { $push: { players: player.id } });

        log('Player joined pickup', {
          data,
          userId: user.id,
        });
      }

      return cb(null);
    } catch (error) {
      log('Error while joining pickup queue', {
        userId: user.id,
        data,
        error,
      });

      return cb(error);
    }
  };
}
