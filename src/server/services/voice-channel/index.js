import debug from 'debug';
import hooks from 'feathers-hooks-common';

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

const devService = {
  create: () => Promise.resolve(true),
  delete: () => Promise.resolve(true),
};

const service = {
  async create({
    region,
    name,
  }) {
    if (!createStrategies[region]) {
      log('No CREATE strategy was specified for the region', region);

      return;
    }

    try {
      log('Creating new voice channel', region, name);

      await createStrategies[region](this.app, name);
    } catch (error) {
      log('Error while creating voice channel', region, name, error);

      await this.app.service('discord-message').create({
        message: `An error happened while creating voice channel for pickup ${name}`,
        channel: 'errors',
      });
    }
  },

  async delete({
    region,
    name,
  }) {
    if (!deleteStrategies[region]) {
      log('No DELETE strategy was specified for the region', region);

      return;
    }

    try {
      log('Removing voice channel', region, name);

      await deleteStrategies[region](this.app, name);
    } catch (error) {
      log('Error while deleting voice channel', region, name, error);

      await this.app.service('discord-message').create({
        message: `An error happened while deleting voice channel for pickup ${name}`,
        channel: 'errors',
      });
    }
  },
};

/**
 * Setup the slack service for sending custom messages to slack.
 */
export default function voiceChannel() {
  const that = this;

  that.service('voice-channel', that.get('env') === 'dev' ? devService : service);

  that.service('voice-channel').hooks({ before: { all: hooks.disallow('external') } });
}
