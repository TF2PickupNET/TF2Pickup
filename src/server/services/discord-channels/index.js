import config from 'config';
import debug from 'debug';
import hooks from 'feathers-hooks-common';

const log = debug('TF2Pickup:discord-channels');

/**
 * The Discord Channel service for creating and deleting channels.
 *
 * @class
 */
class DiscordChannels {
  channels = {};

  /**
   * We need to store the app in the class so we can use it later.
   *
   * @param {Object} app - The feathers app object.
   */
  setup(app) {
    this.app = app;
  }

  /**
   * Create a Discord voice channel.
   *
   * @param {Object} channel - Information about the channel.
   * @param {Object} channel.region - The region the channel should be created.
   * @param {Object} channel.name - The name of the channel.
   */
  async create({
    region,
    name,
  }) {
    const reason = `Created for pickup ${name}`;
    const guildId = config.get(`service.discord.guild.${region}`);
    const bot = await this.app.service('discord').get();
    const guild = bot.guilds.get(guildId);
    const channelRED = await guild.createChannel(`${name} RED`, 'voice', [], reason);
    const channelBLU = await guild.createChannel(`${name} BLU`, 'voice', [], reason);

    this.channels[name] = {
      red: channelRED,
      blu: channelBLU,
    };
  }

  /**
   * Delete a Discord voice channel.
   *
   * @param {Object} channel - Information about the channel.
   * @param {Object} channel.name - The name of the channel.
   */
  async delete({ name }) {
    const channels = this.channels[name];
    const reason = `${name} ended`;

    if (!channels) {
      log(`Discord channels for pickup ${name} does not exist`);

      return;
    }

    await channels.red.delete(reason);
    await channels.blu.delete(reason);
  }
}

const defaultService = {
  create: () => Promise.resolve(true),
  delete: () => Promise.resolve(true),
};

/**
 * Discord channels service.
 */
export default function discordChannels() {
  const that = this;

  log('Initializing discord-channels service');

  that.service(
    'discord-channels',
    config.has('service.discord.token') ? new DiscordChannels() : defaultService,
  );

  that.service('discord-channels').hooks({ before: { all: hooks.disallow('external') } });
}
