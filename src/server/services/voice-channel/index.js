import debug from 'debug';

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
  create({
    region,
    name,
  }) {
    if (!createStrategies[region]) {
      log('No CREATE strategy was specified for the region', region);

      return Promise.reject(new Error(`No CREATE strategy was specified for the region ${region}`));
    }

    log('Creating new voice channel for region', region, name);

    return createStrategies[region](this.app, name);
  },

  delete({
    region,
    name,
  }) {
    if (!deleteStrategies[region]) {
      log('No DELETE strategy was specified for the region', region);

      return Promise.reject(new Error(`No DELETE strategy was specified for the region ${region}`));
    }

    log('Removing voice channel for region', region, name);

    return deleteStrategies[region](this.app, name);
  },
};

/**
 * Setup the slack service for sending custom messages to slack.
 */
export default function voiceChannel() {
  const that = this;

  that.service('voice-channel', that.get('env') === 'dev' ? devService : service);
}
