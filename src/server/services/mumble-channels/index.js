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

    /**
     * Handle mumble connection.
     *
     * @param {String} region - Mumble region.
     * @param {Object} connection - Mumble connection.
     */
    const handleConnection = (region, connection) => {
      connection.authenticate(mumbleUsername, mumblePassword);

      connection.on('initialized', () => {
        this.connections[region.name] = connection;
      });
    };

    Object
      .values(regions)
      .forEach((region) => {
        const url = getMumbleIP(region.name);

        mumble.connect(url, {}, (error, connection) => {
          if (error) {
            log(`Error connecting to ${region.name} mumble server`, error);

            return;
          }

          handleConnection(region, connection);
        });
      });
  }

  /**
   * Create mumble channel.
   *
   * @param {Object} channel - Mumble channel.
   * @param {Object} channel.region - Mumble channel region.
   * @param {Object} channel.name - Mumble channel name.
   */
  async create({
    region,
    name,
  }) {
    const channel = await this.connections[region].channelByName('Pickups');

    await channel.addSubChannel(name);
  }

  /**
   * Delete mumble channel.
   *
   * @param {Object} channel - Mumble channel.
   * @param {Object} channel.region - Mumble channel region.
   * @param {Object} channel.name - Mumble channel name.
   */
  async delete({
    region,
    name,
  }) {
    const channel = await this.connections[region].channelByName(name);

    await channel.remove(name);
  }
}

/**
 * Mumble service.
 */
export default function mumbleChannels() {
  const that = this;

  that.service('mumble-channels', new MumbleService());
}
