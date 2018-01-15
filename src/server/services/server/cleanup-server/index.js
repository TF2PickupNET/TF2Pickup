import config from 'config';
import debug from 'debug';
import {
  isBefore,
  subMinutes,
} from 'date-fns';

import { map } from '../../../../utils/functions';

import servemeStrategy from './serveme-strategy';

const log = debug('TF2Pickup:server:cleanup-server');

const strategies = {
  eu(server) {
    return servemeStrategy(
      'http://serveme.tf',
      config.get('service.serveme.apikey-eu'),
      server.reservationId,
    );
  },

  na(server) {
    return servemeStrategy(
      'http://serveme.tf',
      config.get('service.serveme.apikey-eu'),
      server.reservationId,
    );
  },
};

/**
 * Check the servers and whether or not they should be cleaned up.
 *
 * @param {Object} app - The feathers app object.
 * @returns {Function} - The handler for checking the servers.
 */
export default function cleanupServer(app) {
  return async () => {
    const servers = await app.service('server').find({ query: { isActive: true } });

    await Promise.all(
      map(async (server) => {
        const [pickup] = await app.service('pickup').find({ query: { serverId: server.id } });

        if (!pickup) {
          return;
        }

        const is5MinutesOld = isBefore(
          pickup.endedOn ? new Date(pickup.endedOn) : new Date(),
          subMinutes(new Date(), 5),
        );

        if (is5MinutesOld) {
          try {
            log('Cleaning server up for pickup', pickup.id);

            await strategies[server.region](server);

            await app.service('server').patch(server.id, { $set: { isActive: false } });
          } catch (error) {
            log('Error while cleaning up server for pickup', pickup.id, error);
          }
        }
      })(servers),
    );
  };
}
