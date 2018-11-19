// @flow

import {
  GeneralError,
  Forbidden,
} from '@feathersjs/errors';
import config from 'config';
import { type CreateBeforeHookContext } from '@feathersjs/feathers';
import debug from 'debug';

import { type User } from '../../../../types/User';
import steamApi from '../../../utils/steam-api';

const log = debug('TF2Pickup:users:fetch-tf2-hours');
const requiredHours = config.get('auth.required-hours');
const tf2AppId = 440;

const generalErrorMessage = `
Something went wrong while trying to get your played hours in TF2.
Make sure that your Steam profile is public!
It may take some minutes after setting your profile to public.
Please try again in a few minutes.
If the problem persists concat a developer over discord.
`;

const notEnoughHoursMessage = `
You don't have the required minimum hours in TF2 to play TF2Pickup.
You need at least ${requiredHours} hours in TF2.
`;

export default async function validateHours(hook: CreateBeforeHookContext<User>) {
  if (requiredHours === null) {
    return;
  }

  // eslint-disable-next-line fp/no-let
  let hours = 0;

  try {
    const { data } = await steamApi.get('IPlayerService/GetOwnedGames/v0001/', {
      params: {
        steamid: hook.data.id,
        include_played_free_games: 1, // eslint-disable-line camelcase
      },
    });
    const games = data.response && data.response.games ? data.response.games : [];
    const game = games.find(({ appid }) => appid === tf2AppId);

    hours = game ? Math.floor(game.playtime_forever / 60) : 0;
  } catch (error) {
    log('Error while getting tf2 hours for userId', {
      error,
      userId: hook.data.id,
    });

    throw new GeneralError(generalErrorMessage);
  }

  if (hours < requiredHours) {
    log('User doesn\'t have enough hours', {
      userId: hook.data.id,
      data: {
        hours,
        requiredHours,
      },
    });

    throw new Forbidden(notEnoughHoursMessage);
  }
}
