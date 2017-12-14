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
  isReady = false;

  channels = {};

  /**
   * Mumble service setup.
   */
  setup() {
    const botToken = config.get('service.discord.token');

    bot.on('ready', () => {
      this.isReady = true;

      log('Service connected!');
    });

    bot.login(botToken);
  }

  /**
   * Create discord voice channel.
   *
   * @param {Object} channel - Discord channel.
   * @param {Object} channel.region - Discord channel region.
   * @param {Object} channel.name - Discord channel name.
   */
  async create({
    region,
    name,
  }) {
    if (!this.isReady) {
      throw new Error('Discord bot is not ready!');
    }

    const guildId = config.get(`service.discord.${region}.guild`);
    const guild = bot.guilds.get(guildId);

    const pickup = `${region.toUpperCase()}-${name}`;
    const reason = `Created for pickup ${pickup}`;

    try {
      const channelRED = await guild.createChannel(`Pickup ${pickup} RED`, 'voice', [], reason);
      const channelBLU = await guild.createChannel(`Pickup ${pickup} BLU`, 'voice', [], reason);

      log(`Created channels for ${pickup}!`);

      this.channels[pickup] = {
        red: channelRED,
        blu: channelBLU,
      };
    } catch (error) {
      log(`Error while creating discord channels ${error}`);
    }
  }

  /**
   * Delete discord voice channel.
   *
   * @param {Object} channel - Discord channel.
   * @param {Object} channel.region - Discord channel region.
   * @param {Object} channel.name - Discord channel name.
   */
  delete({
    region,
    name,
  }) {
    if (!this.isReady) {
      throw new Error('Discord bot is not ready!');
    }

    const pickup = `${region.toUpperCase()}-${name}`;
    const channels = this.channels[pickup];
    const reason = `Pickup ${pickup} ended`;

    if (!channels) {
      log(`Discord channels for pickup ${pickup} does not exist`);
    }

    log(`Removed channels for ${pickup}!`);

    try {
      channels.red.delete(reason);
      channels.blu.delete(reason);
    } catch (error) {
      log(`Error while deleting discord channels ${error}`);
    }
  }

  /**
   * Message Regional Discord Channel.
   *
   * @param {Object} message - Message to send.
   * @param {Object} message.text - Text message to send.
   * @param {Object} message.region - Region to send message in.
   */
  async message({
    text,
    region,
  }) {
    if (!this.isReady) {
      throw new Error('Discord bot is not ready!');
    }

    const guildId = config.get(`service.discord.${region}.guild`);
    const channelId = config.get(`service.discord.${region}.channel`);
    const channel = bot.guilds.get(guildId).channels.get(channelId);

    await channel.send(text);
  }

  /**
   * Message Global Discord Channel.
   *
   * @param {Object} text - Text message to send.
   */
  async messageGlobal(text) {
    if (!this.isReady) {
      throw new Error('Discord bot is not ready!');
    }

    const guildId = config.get('service.discord.guild');
    const channelId = config.get('service.discord.channel');
    const channel = bot.guilds.get(guildId).channels.get(channelId);

    await channel.send(text);
  }
}

/**
 * Mumble service.
 */
export default function discordChannels() {
  const that = this;

  that.service('discord', new DiscordService());
}
