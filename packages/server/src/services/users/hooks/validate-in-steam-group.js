// @flow

import {
  GeneralError,
  Forbidden,
} from '@feathersjs/errors';
import config from 'config';
import { type CreateBeforeHookContext } from '@feathersjs/feathers';
import SteamCommunity from 'steamcommunity';
import { promisify } from 'util';
import debug from 'debug';
import { type User } from '@tf2pickup/types';

const community = new SteamCommunity();
const log = debug('TF2Pickup:users:is-in-steam-group');

const getSteamGroup = promisify(community.getSteamGroup.bind(community));

const steamGroupName = config.get('auth.steam-group');

const generalErrorMessage = `
Something went wrong while trying to get the members of the Steam Group.
Please try again in a few minutes.
If the problem persists concat a developer over discord.
`;

const notInGroupMessage = `
The website is currently in beta mode and you are not in the required Steam Group.
You will need to be a member of the Steam Group ${steamGroupName} to login into TF2Pickup.
`;

export default async function validateInSteamGroup(hook: CreateBeforeHookContext<User>) {
  if (!config.get('beta') || !steamGroupName) {
    return;
  }

  let isInGroup = false;

  try {
    const steamGroup = await getSteamGroup(steamGroupName);
    const getMembers = promisify(steamGroup.getMembers.bind(steamGroup));
    const members = await getMembers();

    isInGroup = members.some(member => member.getSteamID64() === hook.data.id);
  } catch (error) {
    log('Error while getting group members', error);

    throw new GeneralError(generalErrorMessage);
  }

  if (!isInGroup) {
    throw new Forbidden(notInGroupMessage);
  }
}
