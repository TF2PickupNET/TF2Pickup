import config from 'config';
import Discord from 'discord.js';
import debug from 'debug';

const log = debug('TF2Pickup:discord');

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
      const botToken = config.get('service.discord.token');

      const timeout = setTimeout(reject, 3 * 1000);

      this.bot.on('ready', () => {
        clearTimeout(timeout);

        log('Discord connected');

        resolve();
      });

      this.bot.login(botToken);
    });
  }

  get() {
    return Promise.resolve(this.bot);
  }
}

const devService = { get: () => Promise.resolve() };

/**
 * Mumble service.
 */
export default function discord() {
  const that = this;

  that.service(
    'discord',
    that.get('env') === 'dev' ? devService : new DiscordService(),
  );
}
