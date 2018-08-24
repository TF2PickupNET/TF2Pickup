// @flow

import { type CreateAfterHookContext } from '@feathersjs/feathers';
import debug from 'debug';
import hooks from 'feathers-hooks-common';
import SteamCommunity from 'steamcommunity';
import { promisify } from 'util';

import { type User } from '../../../../types';

import validateInSteamGroup from './validate-in-steam-group';
import validateHours from './validate-hours';

const log = debug('TF2Pickup:users:hooks');
const community = new SteamCommunity();
const inviteUserToGroup = promisify(community.inviteUserToGroup.bind(community));

export default {
  before: {
    create: [
      // Validate that the user is in the steam group when the website is in beta mode
      validateInSteamGroup,
      // Validate the users TF2 hours
      validateHours,
    ],
    remove: hooks.disallow(),
  },

  after: {
    create: [
      (hook: CreateAfterHookContext<User>) => log('Created a new user', hook.result.id),
      // Create the rest of the documents for a user.
      async (hook: CreateAfterHookContext<User>) => {
        await hook.app.service('user-settings').create({ id: hook.result.id });

        await hook.app.service('user-profile').create({ id: hook.result.id });
      },

      // Invite the user to the official steam group
      async (hook: CreateAfterHookContext<User>) => {
        await inviteUserToGroup(hook.result.id, '103582791435021680');
      },
    ],
  },
};
