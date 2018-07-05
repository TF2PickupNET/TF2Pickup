// @flow

import { type CreateAfterHookContext } from '@feathersjs/feathers';
import { type App } from '@feathersjs/express';
import debug from 'debug';
import SteamCommunity from 'steamcommunity';
import { promisify } from 'util';
import { type User } from '@tf2pickup/types';

import validateInSteamGroup from './hooks/validate-in-steam-group';
import validateHours from './hooks/validate-hours';

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
      // Create the rest of the documents for a user.
      async (hook: CreateAfterHookContext<App, User>) => {
        await hook.app.service('user-settings').create({ id: hook.data.id });

        await hook.app.service('user-profile').create({ id: hook.data.id });

        // await hook.app.service('user-elo').create({});
      },
    ],
  },

  after: {
    create: [
      (hook: CreateAfterHookContext<App, User>) => log('Created a new user', hook.result.id),

      // Invite the user to the official steam group
      async (hook: CreateAfterHookContext<App, User>) => {
        await inviteUserToGroup(hook.result.id, '103582791435021680');
      },
    ],
  },
};
