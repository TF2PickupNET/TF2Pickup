import nodeMumble from 'mumble';
import config from 'config';

import { getMumbleIP } from '../../../config/index';

import { regions } from '@tf2-pickup/configs/regions';

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

      regions.forEach((region) => {
        const url = getMumbleIP(region.name);

        nodeMumble.connect(url, { }, (error, connection) => {
          if (error) {
            throw new Error(error);
          }

          connection.authenticate(mumbleUsername, mumblePassword);
          connection.on('initialized', setConnection);
        });
      });
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
