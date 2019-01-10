import {
  GeneralError,
  Forbidden,
} from '@feathersjs/errors';
import config from 'config';
import SteamID from 'steamid';
import { CreateBeforeHookContext } from '@feathersjs/feathers';
import { promisify } from 'util';
import debug from 'debug';
import { SteamGroup } from 'steamcommunity';

import User from '../../../../types/User';
import steamCommunity from '../../../utils/steam-community';

const log = debug('TF2Pickup:users:is-in-steam-group');

const getSteamGroup = promisify(
  steamCommunity.getSteamGroup.bind(steamCommunity),
);

const steamGroupName = config.get<string | null>('auth.steam-group');

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
  if (steamGroupName === null) {
    return;
  }

  let isInGroup = false;

  try {
    const steamGroup = await getSteamGroup(steamGroupName) as SteamGroup;
    const getMembers = promisify(steamGroup.getMembers.bind(steamGroup));
    const members = await getMembers() as SteamID[];

    isInGroup = members.some(member => member.getSteamID64() === hook.data.id);
  } catch (error) {
    log('Error while getting group members', {
      error,
      userId: hook.data.id,
      data: { steamGroup: steamGroupName },
    });

    throw new GeneralError(generalErrorMessage);
  }

  if (!isInGroup) {
    log('User is not in the required steam group', {
      userId: hook.data.id,
      data: { steamGroup: steamGroupName },
    });

    throw new Forbidden(notInGroupMessage);
  }
}
