import debug from 'debug';
import { regions } from '@tf2-pickup/config';
import hooks from 'feathers-hooks-common';
import {
  isBefore,
  subMinutes,
} from 'date-fns';
import {
  map,
  pipe,
} from '@tf2-pickup/utils';

const log = debug('TF2Pickup:voice-channel');

const devService = {
  create: () => Promise.resolve(true),
  delete: () => Promise.resolve(true),
};

/**
 * The service class for the voice channels.
 *
 * @class
 */
class VoiceChannelService {
  /**
   * Check all of the voice channels for each region if the voice channel can be deleted.
   *
   * @param {Object} app - The feathers app object.
   * @returns {Function} - Returns a function.
   */
  static checkVoiceChannels(app) {
    return async () => {
      try {
        await Promise.all(
          pipe(
            Object.values,
            map(async (region) => {
              const service = this.app.service(`${region.voiceServer}-channels`);
              const channels = await service.find({ region: region.name });

              return Promise.all(
                map(async (channel) => {
                  let is30MinutesOld = false;

                  try {
                    const pickup = await app.service('pickup').get(channel.pickupId);

                    is30MinutesOld = isBefore(
                      pickup.endedOn ? new Date(pickup.endedOn) : new Date(),
                      subMinutes(new Date(), 30),
                    );
                  } catch (error) {
                    log('Couldn\'t find pickup for voice channel', channel.name, error);
                  }

                  if (channel.isChannelEmpty || is30MinutesOld) {
                    await app.service('voice-channel').delete({
                      name: channel.name,
                      region: channel.region,
                    });
                  }
                })(channels),
              );
            }),
          )(regions),
        );
      } catch (error) {
        log('Error in checking voice channels for deletion', error);

        app.service('discord-message').create({
          message: 'Error in checking voice channels for deletion',
          channel: 'errors',
        });
      }
    };
  }

  /**
   * Setup method for the services.
   *
   * @param {Object} app - The feathers app object.
   */
  setup(app) {
    this.app = app;

    setTimeout(VoiceChannelService.checkVoiceChannels(app), 60 * 1000);

    setInterval(VoiceChannelService.checkVoiceChannels(app), 10 * 60 * 1000);
  }

  /**
   * Create a new voice channel for a pickup.
   *
   * @param {Object} data - The data for the channel.
   * @param {String} data.region - The region of the pickup.
   * @param {String} data.name - The name of the voice channel.
   */
  async create({
    region,
    name,
  }) {
    try {
      log('Creating new voice channel', region, name);

      await this.app.service(`${regions[region].voiceServer}-channels`).create({
        region,
        name,
      });
    } catch (error) {
      log('Error while creating voice channel', region, name, error);

      await this.app.service('discord-message').create({
        message: `An error happened while creating voice channel ${name}`,
        channel: 'errors',
      });
    }
  }

  /**
   * Delete a voice channel again when a pickup has finished.
   *
   * @param {Object} data - The data for the channel.
   * @param {String} data.region - The region of the channel.
   * @param {String} data.name - The name of the channel.
   */
  async delete({
    region,
    name,
  }) {
    try {
      log('Removing voice channel', region, name);

      await this.app.service(`${regions[region].voiceServer}-channels`).delete({
        region,
        name,
      });
    } catch (error) {
      log('Error while deleting voice channel', region, name, error);

      await this.app.service('discord-message').create({
        message: `An error happened while deleting voice channel ${name}`,
        channel: 'errors',
      });
    }
  }
}

/**
 * Setup the voice channel service.
 */
export default function voiceChannel() {
  const that = this;

  that.service('voice-channel', that.get('env') === 'dev' ? devService : new VoiceChannelService());

  that.service('voice-channel').hooks({ before: { all: hooks.disallow('external') } });
}
