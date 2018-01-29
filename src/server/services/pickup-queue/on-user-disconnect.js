import sleep from 'sleep-promise';
import debug from 'debug';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import {
  map,
  pipe,
} from '../../../utils/functions';
import { removePlayersFromClasses } from '../../../utils/pickup-queue';

const log = debug('TF2Pickup:pickup-queue:on-user-disconnect');

/**
 * Remove the user from the queues when he disconnects.
 *
 * @param {Object} app - The feathers app object.
 * @param {String} id - The users id.
 */
export default async function onUserDisconnect(app, id) {
  await sleep(30 * 1000);

  try {
    const pickupQueue = app.service('pickup-queue');
    const user = await app.service('users').get(id);

    if (!user.online) {
      log('Removing user from pickup because of disconnect', id);
      const pickups = await Promise.all(
        pipe(
          Object.keys,
          map(gamemode => pickupQueue.get(`${user.settings.region}-${gamemode}`)),
        )(gamemodes),
      );

      await Promise.all(
        map(pickup => pickupQueue.patch(
          pickup.id,
          { $set: { classes: removePlayersFromClasses([id])(pickup.classes) } },
        ))(pickups),
      );
    }
  } catch (error) {
    log('Error while removing user from pickup because of disconnect', id, error);
  }
}
