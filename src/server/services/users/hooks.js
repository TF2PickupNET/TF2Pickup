import merge from 'lodash.merge';
import SteamCommunity from 'steamcommunity';
import auth from 'feathers-authentication';

import getNewUserData from './get-new-user-data';
import { inviteToSteamGroup } from '/src/utils/steam';
import promisify from '/src/utils/promisify';

const community = new SteamCommunity();

export default {
  before: {
    async create(props) {
      const newProps = props;
      const newData = await getNewUserData(props.data, props.app);

      newProps.data = merge({}, newProps.data, newData, { createdAt: new Date() });

      return newProps;
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

    find: [
      auth.hooks.authenticate('jwt'),
      (props) => {
        if (props.result[0].id === props.params.user.id) {
          return props;
        }

        return props;
      },
    ],
  },
};
