import mumble from 'mumble';
import config from 'config';
import debug from 'debug';
import sleep from 'sleep-promise';
import fs from 'fs';
import path from 'path';
import hooks from 'feathers-hooks-common';

import {
  filter,
  map,
  pipe,
} from '../../../utils/functions';

const log = debug('TF2Pickup:mumble-channels');

const readFile = url => new Promise((resolve, reject) => {
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  fs.readFile(url, (err, data) => {
    if (err) {
      return reject(err);
    }

    return resolve(data);
  });
});

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
    const configPath = path.join(process.cwd(), '/config');

    return Promise.all(
      pipe(
        Object.entries,
        filter(([, options]) => options.key && options.cert && options.ip),
        map(async ([region, options]) => {
          try {
            const key = await readFile(path.join(configPath, options.key));
            const cert = await readFile(path.join(configPath, options.cert));

            await this.connect(region, options.ip, {
              key,
              cert,
            });
          } catch (error) {
            log('Error while getting one of the pem files', region, error);
          }
        }),
      )(config.get('mumble.servers')),
    );
  }

  /**
   * Connect to a specific mumble server.
   *
   * @param {String} region - The region of the mumble server.
   * @param {String} ip - The url of the region.
   * @param {Object} options - The options for the connection.
   * @returns {Promise} - Returns a promise which will resolve
   * when the connection has been established.
   */
  connect(region, ip, options) {
    return new Promise((resolve) => {
      mumble.connect(ip, options, (error, connection) => {
        if (error) {
          log(`Error while connecting to ${region} mumble server`, error);

          return;
        }

        connection.authenticate('TF2Pickup');

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
   */
  async create({
    region,
    name,
  }) {
    if (!this.connections[region]) {
      throw new Error(`No connection for region ${region} has been established`);
    }

    const channel = this.connections[region].channelByName('Pickups');

    channel.addSubChannel(name);

    await sleep(5 * 1000);

    const pickupChannel = this.connections[region].channelByName(name);

    pickupChannel.addSubChannel('Blu');

    pickupChannel.addSubChannel('Red');
  }

  /**
   * Delete a mumble channel.
   *
   * @param {Object} data - Mumble channel.
   * @param {Object} data.region - The region of the mumble channel.
   * @param {Object} data.name - The name of the mumble channel.
   */
  delete({
    region,
    name,
  }) {
    if (!this.connections[region]) {
      throw new Error(`No connection for region ${region} has been established`);
    }

    const channel = this.connections[region].channelByName(name);

    channel.remove(name);
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

  that.service('mumble-channels').hooks({ before: { all: hooks.disallow('external') } });

  setTimeout(() => that.service('mumble-channels').create({
    region: 'eu',
    name: 'Pickup 1',
  }), 30 * 1000);
}
