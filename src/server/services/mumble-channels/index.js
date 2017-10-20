import mumble from 'mumble';
import config from 'config';
import debug from 'debug';

import regions from '@tf2-pickup/configs/regions';

import { getMumbleIP } from '../../../config/index';

const log = debug('TF2Pickup:mumble');

class MumbleService {
  connections = {};

  setup() {
    const mumbleUsername = config.get('server.mumble.username');
    const mumblePassword = config.get('server.mumble.password');

    Object
      .values(regions)
      .forEach((region) => {
        const url = getMumbleIP(region.name);

        mumble.connect(url, {}, (error, connection) => {
          if (error) {
            log(`Error connecting to ${region.name} mumble server`, error);

            return;
          }

          connection.authenticate(mumbleUsername, mumblePassword);

          connection.on('initialized', () => {
            this.connections[region.name] = connection;
          });
        });
      });
  }

  create({
    region,
    name,
  }) {
    const channel = this.connections[region].channelByName('Pickups');

    channel.addSubChannel(name);
  }

  delete({
    region,
    name,
  }) {
    const channel = this.connections[region].channelByName(name);

    channel.remove(name);
  }
}

/**
 * Mumble service.
 */
export default function mumbleChannels() {
  const that = this;

  that.service('mumble-channels', new MumbleService());
}
