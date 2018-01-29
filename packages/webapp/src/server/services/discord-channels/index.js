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
  /**
   * We need to store the app in the class so we can use it later.
   *
   * @param {Object} app - The feathers app object.
   */
  setup(app) {
    this.app = app;
  }

  /**
   * Find all of the current pickup voice channels.
   *
   * @param {Object} data - The data for the voice channels.
   * @param {String} data.region - The region for the channels.
   * @returns {Object[]} - Returns the channels.
   */
  async find({ region }) {
    const guildId = config.get(`service.discord.guild.${region}`);
    const bot = await this.app.service('discord').get();
    const guild = bot.guilds.get(guildId);
    const regex = /Pickup (\d+) (Blu|Red)/;

    return guild.channels
      .filterArray(channel => channel.type === 'voice')
      .filter(channel => regex.test(channel.name))
      .map((channel) => {
        return {
          region,
          name: channel.name,
          pickupId: parseInt(regex.exec(channel.name)[1], 10),
          isChannelEmpty: channel.members.array().length === 0,
        };
      });
  }

  /**
   * Create a Discord voice channel.
   *
   * @param {Object} data - Information about the channel.
   * @param {Object} data.region - The region the channel should be created.
   * @param {Object} data.name - The name of the channel.
   */
  async create({
    region,
    name,
  }) {
    const reason = `Created for pickup ${name}`;
    const guildId = config.get(`service.discord.guild.${region}`);
    const bot = await this.app.service('discord').get();
    const guild = bot.guilds.get(guildId);

    await guild.createChannel(`${name} Red`, 'voice', [], reason);
    await guild.createChannel(`${name} Blu`, 'voice', [], reason);
  }

  /**
   * Delete a Discord voice channel.
   *
   * @param {Object} data - Information about the channel.
   * @param {Object} data.name - The name of the channel.
   * @param {String} data.region - The region of the channel.
   */
  async delete({
    name,
    region,
  }) {
    const reason = `${name} ended`;
    const guildId = config.get(`service.discord.guild.${region}`);
    const bot = await this.app.service('discord').get();
    const guild = bot.guilds.get(guildId);

    await Promise.all(
      guild.channels
        .filterArray(channel => channel.type === 'voice' && channel.name === name)
        .map(channel => channel.delete(reason)),
    );
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
