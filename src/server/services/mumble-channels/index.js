import mumble from 'mumble';
import config from 'config';
import debug from 'debug';
import regions from '@tf2-pickup/configs/regions';

import { getMumbleIP } from '../../../config/index';

const log = debug('TF2Pickup:mumble');

/**
 * Mumble service.
 *
 * @class Mumble Service class.
 */
class MumbleService {
  connections = {};

  /**
   * Mumble service setup.
   */
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

          connection.on(
            'initialized',
            this.handleConnectionInitialization(region.name, connection),
          );
        });
      });
  }

  handleConnectionInitialization = (region, connection) => () => {
    this.connections[region] = connection;
  };

  /**
   * Create mumble channel.
   *
   * @param {Object} channel - Mumble channel.
   * @param {Object} channel.region - Mumble channel region.
   * @param {Object} channel.name - Mumble channel name.
   */
  create({
    region,
    name,
  }) {
    const channel = this.connections[region].channelByName('Pickups');

    channel.addSubChannel(name);
  }

  /**
   * Delete mumble channel.
   *
   * @param {Object} channel - Mumble channel.
   * @param {Object} channel.region - Mumble channel region.
   * @param {Object} channel.name - Mumble channel name.
   */
  delete({
    region,
    name,
  }) {
    const channel = this.connections[region].channelByName(name);

    channel.remove(name);
  }
}

const devService = {
  create: () => Promise.resolve(),
  delete: () => Promise.resolve(),
};

/**
 * Mumble service.
 */
export default function mumbleChannels() {
  const that = this;

  that.service(
    'mumble-channels',
    that.get('env') === 'dev' ? devService : new MumbleService(),
  );
}
