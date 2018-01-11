import debug from 'debug';
import regions from '@tf2-pickup/configs/regions';
import hooks from 'feathers-hooks-common';
import {
  isBefore,
  subMinutes,
} from 'date-fns';

import {
  flatten,
  map,
} from '../../../utils/functions';

const log = debug('TF2Pickup:voice-channel');

const createStrategies = {
  eu(app, name) {
    return app.service('mumble-channels').create({
      region: 'eu',
      name,
    });
  },

  na(app, name) {
    return app.service('mumble-channels').create({
      region: 'na',
      name,
    });
  },

  oz(app, name) {
    return app.service('mumble-channels').create({
      region: 'oz',
      name,
    });
  },
};

const deleteStrategies = {
  eu(app, name) {
    return app.service('mumble-channels').delete({
      region: 'eu',
      name,
    });
  },

  na(app, name) {
    return app.service('mumble-channels').delete({
      region: 'na',
      name,
    });
  },

  oz(app, name) {
    return app.service('mumble-channels').delete({
      region: 'oz',
      name,
    });
  },
};

const findStrategies = {
  eu(app) {
    return app.service('mumble-channels').find({ region: 'eu' });
  },

  na(app) {
    return app.service('mumble-channels').find({ region: 'na' });
  },

  oz(app) {
    return app.service('mumble-channels').find({ region: 'oz' });
  },
};

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
   * Setup method for the services.
   *
   * @param {Object} app - The feathers app object.
   */
  setup(app) {
    this.app = app;

    setTimeout(this.checkVoiceChannels, 10 * 60 * 1000);
  }

  checkVoiceChannels = async () => {
    try {
      await Promise.all(
        map(async (region) => {
          const channels = await findStrategies[region](this.app);

          return Promise.all(
            map(async ({
              pickupId,
              isChannelEmpty,
            }) => {
              const pickup = await this.app.service('pickup').get(pickupId);
              const is30MinutesOld = isBefore(new Date(pickup.endedOn), subMinutes(new Date(), 30));

              if (isChannelEmpty || is30MinutesOld) {
                await this.app.service('voice-channel').delete({
                  name: `Pickup ${pickup.id}`,
                  region,
                });
              }
            })(channels),
          );
        })(Object.keys(regions)),
      );
    } catch (error) {
      log('Error in checking voice channels for deletion', error);

      this.app.service('discord-message').create({
        message: '',
        channel: 'errors',
      });
    }
  };

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
    if (!createStrategies[region]) {
      log('No CREATE strategy was specified for the region', region);

      await this.app.service('discord-message').create({
        message: `No CREATE strategy was specified for the region ${region}`,
        channel: 'errors',
      });

      return;
    }

    try {
      log('Creating new voice channel', region, name);

      await createStrategies[region](this.app, name);
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
    if (!deleteStrategies[region]) {
      log('No DELETE strategy was specified for the region', region);

      await this.app.service('discord-message').create({
        message: `No DELETE strategy was specified for the region ${region}`,
        channel: 'errors',
      });
    }

    try {
      log('Removing voice channel', region, name);

      await deleteStrategies[region](this.app, name);
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
