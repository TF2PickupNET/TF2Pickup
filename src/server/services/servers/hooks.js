import sleep from 'sleep-promise';
import debug from 'debug';
import hooks from 'feathers-hooks-common';

import { incrementIdHook } from '../hooks';

import configureServer from './configure-server';

const log = debug('TF2Pickup:servers:hooks');

export default {
  before: {
    all: hooks.disallow('external'),

    create: incrementIdHook,
  },

  after: {
    create(hook) {
      const serverId = hook.result.id;

      (async () => {
        // Wait 60 seconds, we might be able to change this dependent on the region
        await sleep(60 * 1000);

        const pickupQuery = await hook.app.service('pickup').find({ query: { serverId } });
        const pickup = pickupQuery[0];

        log('Configuring server for pickup', pickup.id);

        // Try for the first time configuring the server
        try {
          await configureServer(hook.app, hook.result, pickup);

          log('Successfully configured server for pickup', pickup.id);

          // Setting the pickup state to waiting-for-game-to-start
          await hook.app.service('pickup').patch(
            pickup.id,
            { $set: { status: 'waiting-for-game-to-start' } },
          );
        } catch (error) {
          log('Error while first try of configuring server', pickup.id, error);

          // Wait another 30 seconds before trying again
          await sleep(15 * 1000);

          log('Retrying configuration of server', pickup.id);

          try {
            await configureServer(hook.app, hook.result, pickup);

            await hook.app.service('pickup').patch(
              pickup.id,
              { $set: { status: 'waiting-for-game-to-start' } },
            );
          } catch (err) {
            log('Error while second try of configuring server', pickup.id, err);

            await hook.app.service('discord-message').create({
              channel: 'errors',
              message: `Error while configuring server for pickup ${pickup.id}`,
            });

            // Set the pickup in the error state
            await hook.app.service('pickup').patch(
              pickup.id,
              { $set: { status: 'server-configuration-error' } },
            );
          }
        }
      })();
    },
  },
};
