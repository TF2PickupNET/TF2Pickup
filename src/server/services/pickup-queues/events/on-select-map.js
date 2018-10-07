// @flow

import {
  NotAuthenticated,
  BadRequest,
} from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

import maps from '../../../../config/maps';
import { getPlayerById } from '../utils/get-player';

type Data = {
  queueId: string,
  map: $Keys<typeof maps>,
};

const log = debug('TF2Pickup:pickup-queues:events:on-join');

export default function onSelectMap(app: App, connection: SocketConnection) {
  const pickupQueue = app.service('pickup-queues');
  const pickupPlayers = app.service('pickup-players');

  return async (data: Data, cb: (Error | null) => void) => {
    const currentUser = connection.feathers.user;

    if (!currentUser) {
      return cb(new NotAuthenticated());
    }

    try {
      const queue = await pickupQueue.get(data.queueId);

      if (queue.status !== 'waiting-for-players' && queue.status !== 'ready-up') {
        return cb(new BadRequest('You can\'t select a map right now'));
      }

      if (!queue.maps.includes(data.map)) {
        return cb(new BadRequest('The selected map isn\'t an option'));
      }

      const player = await getPlayerById(app, queue.players, currentUser.id);

      if (!player) {
        return cb(new BadRequest('You aren\'t in the pickup queue'));
      }

      await pickupPlayers.patch(player.id, { $set: { map: data.map } });

      log('Player selected a map', {
        data,
        userId: currentUser.id,
      });

      return cb(null);
    } catch (error) {
      log('Error while selecting a map', {
        data,
        userId: currentUser.userId,
        error,
      });

      return cb(error);
    }
  };
}
