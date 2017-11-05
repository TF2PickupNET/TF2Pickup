import config from 'config';
import Discord from 'discord.js';
import debug from 'debug';

const log = debug('TF2Pickup:discord');
const bot = new Discord.Client();

/**
 * Discord service.
 *
 * @class Discord Service class.
 */
class DiscordService {
  readyFlag = false;

  channels = {};

  /**
   * Mumble service setup.
   */
  setup() {
    const botToken = config.get('service.discord.token');

    bot.on('ready', () => {
      this.readyFlag = true;

      log('Service connected!');
    });

    bot.login(botToken);
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
    if (!this.readyFlag) {
      throw new Error('Discord bot is not ready!');
    }

    const guildId = config.get('server.discord.guild');
    const guild = bot.guilds.get(guildId);

    const pickup = `${region}-${name}`;
    const reason = `Created for pickup ${pickup}`;
    const channelRED = await guild.createChannel(`Pickup ${pickup} RED`, 'voice', [], reason);
    const channelBLU = await guild.createChannel(`Pickup ${pickup} BLU`, 'voice', [], reason);

    log(`Created channels for ${pickup}!`);

    this.channels[pickup] = {
      red: channelRED,
      blu: channelBLU,
    };
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
    const pickup = `${region}-${name}`;
    const channels = this.channels[pickup];
    const reason = `Pickup ${pickup} ended`;

    if (!channels) {
      throw new Error(`Discord channels for pickup ${pickup} do not exist`);
    }

    log(`Removed channels for ${pickup}!`);

    channels.red.delete(reason);
    channels.blu.delete(reason);
  }
}

/**
 * Mumble service.
 */
export default function discordChannels() {
  const that = this;

  that.service('discord-channels', new DiscordService());
}
