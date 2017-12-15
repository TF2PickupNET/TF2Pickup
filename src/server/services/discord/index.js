import config from 'config';
import Discord from 'discord.js';
import debug from 'debug';
import hooks from 'feathers-hooks-common';

const log = debug('TF2Pickup:discord');
const token = config.get('service.discord.token');

/**
 * Discord service.
 *
 * @class Discord Service class.
 */
class DiscordService {
  bot = new Discord.Client();

  /**
   * Mumble service setup.
   *
   * @returns {Promise} - R.
   */
  setup() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(reject, 3 * 1000);

      this.bot.on('ready', () => {
        clearTimeout(timeout);

        log('Discord connected');

        resolve();
      });

      this.bot.login(token);
    });
  }

  get() {
    return Promise.resolve(this.bot);
  }
}

const defaultService = { get: () => Promise.resolve() };

/**
 * Mumble service.
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
