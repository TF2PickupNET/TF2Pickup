import config from 'config';
import debug from 'debug';
import hooks from 'feathers-hooks-common';

const log = debug('TF2Pickup:discord-message');
const guildId = config.get('service.discord.guild.global');

/**
 * The Discord service for creating a message in discord.
 *
 * @class
 */
class DiscordMessage {
  /**
   * We need to store the app in the class so we can use it later.
   *
   * @param {Object} app - The feathers app object.
   */
  setup(app) {
    this.app = app;
  }

  /**
   * Create a new message in the discord.
   *
   * @param {Object} props - Information about the channel and the content of the message.
   */
  async create(props) {
    const bot = await this.app.service('discord').get();
    const channels = bot.guilds.get(guildId).channels;

    if (channels.exists('name', props.channel)) {
      await channels
        .find('name', props.channel)
        .send(props.message);

      log('Send message to discord channel', props.channel);
    } else {
      log('Tried to send message to unknown discord channel', props.channel);
    }
  }
}

const defaultService = { create: () => Promise.resolve(true) };

/**
 * Discord message service.
 */
export default function discordMessage() {
  const that = this;

  log('Initializing discord-message service');

  that.service(
    'discord-message',
    config.has('service.discord.token') ? new DiscordMessage() : defaultService,
  );

  that.service('discord-message').hooks({ before: { all: hooks.disallow('external') } });
}
