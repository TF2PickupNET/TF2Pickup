import sleep from 'sleep-promise';
import debug from 'debug';
import hooks from 'feathers-hooks-common';

import configureServer from './configure-server';
import { pick } from '../../../utils/functions';

const log = debug('TF2Pickup:servers:hooks');

export default {
  before: {
    all: hooks.disallow('external'),

    async create(hook) {
      const lastServer = await hook.app.service('servers').find({
        query: {
          $limit: 1,
          $sort: { id: -1 },
        },
      });

      return {
        ...hook,
        data: {
          ...hook.data,
          id: lastServer[0] ? lastServer[0].id + 1 : 1,
        },
      };
    },
  },

  after: {
    create(hook) {
      const serverId = hook.result.id;

      (async () => {
        // Wait 60 seconds, we might be able to change this dependent on the region
        await sleep(60 * 1000);

        log('Configuring server with id', serverId);

        const pickup = await hook.app.service('pickup').find({ query: { serverId } });

        // Try for the first time configuring the server
        try {
          await configureServer(hook.app, serverId);

          log('Successfully configured server for pickup', pickup[0].id);

          // Setting the pickup state to waiting-for-game-to-start
          await hook.app.service('pickup').patch(
            pickup[0].id,
            { $set: { status: 'waiting-for-game-to-start' } },
          );
        } catch (error) {
          log('Error while first try of configuring server', serverId, error);

          // Wait another 30 seconds before trying again
          await sleep(30 * 1000);

          log('Retrying configuration of server', serverId);

          try {
            await configureServer(hook.app, serverId);

            await hook.app.service('pickup').patch(
              pickup[0].id,
              { $set: { status: 'waiting-for-game-to-start' } },
            );
          } catch (err) {
            log('Error while second try of configuring server', serverId, err);

            // Set the pickup in the error state
            await hook.app.service('pickup').patch(
              pickup[0].id,
              { $set: { status: 'server-configuration-error' } },
            );
          }
        }
      })();
    },
  },
};
