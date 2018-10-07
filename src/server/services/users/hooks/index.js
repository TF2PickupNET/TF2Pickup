// @flow

import { type CreateAfterHookContext } from '@feathersjs/feathers';
import debug from 'debug';
import hooks from 'feathers-hooks-common';
import { promisify } from 'util';

import { type User } from '../../../../types/user';
import steamCommunity from '../../../utils/steam-community';

import validateInSteamGroup from './validate-in-steam-group';
import validateHours from './validate-hours';

const log = debug('TF2Pickup:users:hooks');
const inviteUserToGroup = promisify(steamCommunity.inviteUserToGroup.bind(steamCommunity));

export default {
  before: {
    create: [
      // Validate that the userId is in the steam group when the website is in beta mode
      validateInSteamGroup,
      // Validate the users TF2 hours
      validateHours,
    ],
    remove: hooks.disallow(),
  },

  after: {
    create: [
      (hook: CreateAfterHookContext<User>) => {
        log('Created a new user', {
          userId: hook.result.id,
          data: hook.result,
        });
      },
      // Create the rest of the documents for a userId.
      async (hook: CreateAfterHookContext<User>) => {
        await hook.app.service('user-settings').create({ id: hook.result.id });

        await hook.app.service('user-profiles').create({ id: hook.result.id });
      },

      // Invite the userId to the official steam group
      async (hook: CreateAfterHookContext<User>) => {
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
