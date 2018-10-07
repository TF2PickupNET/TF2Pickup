// @flow

import {
  NotAuthenticated,
  BadRequest,
} from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

import { getPlayerById } from '../utils/get-player';

type Data = { queueId: string };

const log = debug('TF2Pickup:pickup-queues:events:on-join');

export default function onReadyUp(app: App, connection: SocketConnection) {
  const pickupQueue = app.service('pickup-queues');
  const pickupPlayers = app.service('pickup-players');

  return async (data: Data, cb: (Error | null) => void) => {
    const currentUser = connection.feathers.user;

    if (!currentUser) {
      return cb(new NotAuthenticated());
    }

    try {
      const queue = await pickupQueue.get(data.queueId);

      if (queue.status !== 'ready-up') {
        return cb(new BadRequest('The pickup isn\'t in the ready-up state'));
      }

      const player = await getPlayerById(app, queue.players, currentUser.id);

      if (!player) {
        return cb(new BadRequest('You aren\'t in the pickup queue'));
      }

      await pickupPlayers.patch(player.id, { $set: { isReady: true } });

      log('Player readied up', {
        data,
        userId: currentUser.id,
      });

      return cb(null);
    } catch (error) {
      log('Error while readying up', {
        data,
        userId: currentUser.userId,
        error,
      });

      return cb(error);
    }
  };
}
