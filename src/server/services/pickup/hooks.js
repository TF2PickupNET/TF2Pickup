import config from 'config';

import configureServer from './configure-server';

export default {
  after: {
    create(props) {
      configureServer(props);

      if (config.has(`service.discord.guilds.${props.result.region}`)) {
        props.app.service('discord-channels').create({
          region: props.result.region,
          name: props.result.id,
        });
      } else {
        props.app.service('mumble-channels').create({
          region: props.result.region,
          name: props.result.id,
        });
      }

      return props;
    },

    async patch(props) {
      const serverStatus = ['game-finished', 'server-configuration-error'];

      if (serverStatus.includes(props.result.status)) {
        if (config.has(`service.discord.guilds.${props.result.region}`)) {
          await props.app.service('discord-channels').delete({
            region: props.result.region,
            name: props.result.id,
          });
        } else {
          await props.app.service('mumble-channels').delete({
            region: props.result.region,
            name: props.result.id,
          });
        }
      }

      return props;
    },
  },
};
