import config from 'config';
import debug from 'debug';
import hooks from 'feathers-hooks-common';

const log = debug('TF2Pickup:discord-channels');

/**
 * Discord service.
 *
 * @class Discord Service class.
 */
class DiscordChannels {
  channels = {};

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
   * Delete discord voice channel.
   *
   * @param {Object} channel - Discord channel.
   * @param {Object} channel.region - Discord channel region.
   * @param {Object} channel.name - Discord channel name.
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
 * Mumble service.
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
