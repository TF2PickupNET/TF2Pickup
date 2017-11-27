import mumble from 'mumble';
import config from 'config';
import debug from 'debug';
import regions from '@tf2-pickup/configs/regions';

import { getMumbleIP } from '../../../config';
import {
  map,
  pipe,
} from '../../../utils/functions';

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
   *
   * @returns {Promise} - Returns a promise for .
   */
  setup() {
    return Promise.all(
      pipe(
        Object.keys,
        map(region => this.connect(getMumbleIP(region), region)),
      )(regions),
    );
  }

  /**
   * Connect to a specific mumble server.
   *
   * @param {String} url - The url of the mumble server.
   * @param {String} region - The name of the region.
   * @returns {Promise} - Returns a promise which will resolve
   * when the connection has been established.
   */
  connect(url, region) {
    return new Promise((resolve, reject) => {
      const mumbleUsername = config.get('server.mumble.username');
      const mumblePassword = config.get('server.mumble.password');

      mumble.connect(url, {}, (error, connection) => {
        if (error) {
          log(`Error while connecting to ${region} mumble server`, error);

          reject(error);
        }

        connection.authenticate(mumbleUsername, mumblePassword);

        connection.on('initialized', () => {
          log(`Successfully connected to ${region} mumble`);

          this.connections[region] = connection;

          resolve();
        });
      });
    });
  }

  /**
   * Create a mumble channel.
   *
   * @param {Object} data - Mumble channel.
   * @param {Object} data.region - The region of the mumble channel.
   * @param {Object} data.name - The name of the mumble channel.
   * @returns {(Error|Boolean)} - Throws an error or returns true if the channel has been created.
   */
  create({
    region,
    name,
  }) {
    if (!this.connections[region]) {
      return Promise.reject(new Error(`No connection for region ${region} has been established`));
    }

    const channel = this.connections[region].channelByName('Pickups');

    channel.addSubChannel(name);

    return Promise.resolve(true);
  }

  /**
   * Delete a mumble channel.
   *
   * @param {Object} data - Mumble channel.
   * @param {Object} data.region - The region of the mumble channel.
   * @param {Object} data.name - The name of the mumble channel.
   * @returns {(Error|Boolean)} - Throws an error or returns true if the channel has been deleted.
   */
  delete({
    region,
    name,
  }) {
    if (!this.connections[region]) {
      return Promise.reject(new Error(`No connection for region ${region} has been established`));
    }

    const channel = this.connections[region].channelByName(name);

    channel.remove(name);

    return Promise.resolve(true);
  }
}

const devService = {
  create: () => Promise.resolve(true),
  delete: () => Promise.resolve(true),
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
