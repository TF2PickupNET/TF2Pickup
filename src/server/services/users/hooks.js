import merge from 'lodash.merge';
import SteamCommunity from 'steamcommunity';

import getUserData from './third-party-services';
import { inviteToSteamGroup } from '../../../config/steam';

const community = new SteamCommunity();

export default {
  before: {
    async create(props) {
      const userData = await getUserData(props.data.id, true, props.app);

      return {
        ...props,
        data: merge({}, props.data, userData, { createdAt: new Date() }),
      };
    },
  },

  after: {
    async create(props) {
      const logs = props.app.service('logs');

      await logs.create({
        message: 'Created a new user',
        environment: 'server',
        steamId: props.data.id,
      });

      await new Promise((resolve) => {
        community.inviteUserToGroup(props.data.id, inviteToSteamGroup, () => {
          resolve();
        });
      });

      return props;
    },
  },
};
