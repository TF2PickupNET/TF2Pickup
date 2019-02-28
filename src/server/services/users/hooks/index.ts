import { CreateAfterHookContext, Hooks } from '@feathersjs/feathers';
import debug from 'debug';
import {disallow} from 'feathers-hooks-common';
import { promisify } from 'util';
import User from '@typings/User';
import steamCommunity from '@server/utils/steam-community';

import validateInSteamGroup from './validate-in-steam-group';
import validateHours from './validate-hours';

const log = debug('TF2Pickup:users:hooks');
const inviteUserToGroup = promisify(steamCommunity.inviteUserToGroup.bind(steamCommunity));

const hooks: Hooks<User> = {
  before: {
    create: [
      // Validate that the userId is in the steam group when the website is in beta mode
      validateInSteamGroup,
      // Validate the users TF2 hours
      validateHours,
    ],
    remove: disallow(),
  },

  after: {
    create: [
      (hook) => {
        log('Created a new user', {
          userId: hook.result.id,
          data: hook.result,
        });
      },
      // Create the rest of the documents for a userId.
      async (hook: CreateAfterHookContext<User>) => {
        await hook.app.service('user-settings').create({
          id: hook.result.id,
          volume: 0.7,
          emojiSet: 'emojione',
          announcer: 'default',
        });

        await hook.app.service('user-profiles').create({
          lastUpdate: 0,
          id: hook.result.id,
          steam: {
            id: hook.result.id,
            name: '',
            isBanned: false,
            bannedUntil: null,
            friends: [],
            customUrl: null,
            avatar: {
              small: '',
              medium: '',
              large: '',
            },
          },
        });
      },

      // Invite the userId to the official steam group
      async (hook) => {
        try {
          await inviteUserToGroup(hook.result.id, '103582791435021680');
        } catch (error) {
          log('Couldn\'t invite new user to the steam group', {
            error,
            userId: hook.result.id,
          });
        }
      },
    ],
  },
};

export default hooks;
