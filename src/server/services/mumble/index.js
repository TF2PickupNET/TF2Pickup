import nodeMumble from 'mumble';
import config from 'config';

import { getMumbleIP } from '../../../config/index';

import regions from '@tf2-pickup/configs/regions';

/**
 * Mumble service.
 */
export default function mumble() {
  const that = this;
  const connections = {};

  that.service('mumble', {
    setup() {
      /**
      * Adds mumble connection to connections.
      *
      * @param {String} regionName - Region name.
      * @param {Object} connection - Mumble connection.
      */
      const setConnection = (regionName, connection) => {
        connections[regionName] = connection;
      };
      const mumbleUsername = config.get('server.mumble.username');
      const mumblePassword = config.get('server.mumble.password');

      // eslint-disable-next-line no-restricted-syntax
      for (const key in regions) {
        // eslint-disable-next-line no-prototype-builtins
        if (regions.hasOwnProperty(key)) {
          const url = getMumbleIP(key);

          nodeMumble.connect(url, { }, (error, connection) => {
            if (error) {
              throw new Error(error);
            }

            connection.authenticate(mumbleUsername, mumblePassword);
            connection.on('initialized', setConnection);
          });
        }
      }
    },

    create(region, name) {
      const channel = connections[region].channelByName('Pickups');

      channel.addSubChannel(name);
    },

    delete(region, name) {
      const channel = connections[region].channelByName(name);

      channel.remove(name);
    },
  });
}
