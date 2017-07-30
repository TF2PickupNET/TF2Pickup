import merge from 'lodash.merge';
import SteamCommunity from 'steamcommunity';
import promisify from 'es6-promisify';

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
      const promise = promisify(community.inviteUserToGroup, community);

      await logs.create({
        message: 'Created a new user',
        environment: 'server',
        steamId: props.data.id,
      });

      await promise(props.data.id, inviteToSteamGroup);

      return props;
    },
  },
};
