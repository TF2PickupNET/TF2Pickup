import config from 'config';
import Discord from 'discord.js';
import debug from 'debug';
import hooks from 'feathers-hooks-common';

const log = debug('TF2Pickup:discord');
const token = config.get('service.discord.token');

/**
 * The Discord service.
 *
 * @class
 */
class DiscordService {
  client = new Discord.Client();

  /**
   * Setup the discord client and login with the token.
   *
   * @returns {Promise} - Returns a promise which will resolve when the client is ready.
   */
  setup() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(reject, 3 * 1000);

      this.client.on('ready', () => {
        clearTimeout(timeout);

        log('Discord connected');

        resolve();
      });

      this.client.login(token);
    });
  }

  /**
   * Get the discord client.
   *
   * @returns {Promise} - Returns the client.
   */
  get() {
    return Promise.resolve(this.client);
  }
}

const defaultService = { get: () => Promise.resolve() };

/**
 * Discord service.
 */
export default function discord() {
  const that = this;

  log('Initializing discord service');

  that.service(
    'discord',
    token ? new DiscordService() : defaultService,
  );

  that.service('discord').hooks({ before: { all: hooks.disallow('external') } });
}
