import config from 'config';
import debug from 'debug';

const log = debug('TF2Pickup:discord-message');
const guildId = config.get('service.discord.guild.global');

/**
 * Discord service.
 *
 * @class Discord Service class.
 */
class DiscordMessage {
  setup(app) {
    this.app = app;
  }

  /**
   * Create discord voice channel.
   *
   * @param {Object} props - Discord channel.
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

/**
 * Mumble service.
 */
export default function discordMessage() {
  const that = this;

  that.service('discord-message', new DiscordMessage());
}
