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
    const bot = await this.app.service('discord').get();
    const guildId = config.get(`service.discord.guild.${region}`);
    const guild = bot.guilds.get(guildId);
    const reason = `Created for pickup ${name}`;

    try {
      const channelRED = await guild.createChannel(`Pickup ${name} RED`, 'voice', [], reason);
      const channelBLU = await guild.createChannel(`Pickup ${name} BLU`, 'voice', [], reason);

      log(`Created discord channels for Pickup ${name}!`);

      this.channels[name] = {
        red: channelRED,
        blu: channelBLU,
      };
    } catch (error) {
      log('Error while creating discord channels', error);
    }
  }

  /**
   * Delete a Discord voice channel.
   *
   * @param {Object} channel - Information about the channel.
   * @param {Object} channel.name - The name of the channel.
   */
  async delete({ name }) {
    const channels = this.channels[name];
    const reason = `Pickup ${name} ended`;

    if (!channels) {
      log(`Discord channels for pickup ${name} does not exist`);
    }

    try {
      await channels.red.delete(reason);
      await channels.blu.delete(reason);

      log(`Removed channels for ${name}!`);
    } catch (error) {
      log('Error while deleting discord channels', error);
    }
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
