// @flow

import { type App } from '@feathersjs/express';

import { type PickupPlayer } from '../../../../types/pickup-player';

export function getPlayers(
  app: App,
  playerIds: $ReadOnlyArray<string>,
): Promise<$ReadOnlyArray<PickupPlayer>> {
  const pickupPlayers = app.service('pickup-players');

  return Promise.all(playerIds.map(id => pickupPlayers.get(id)));
}

export async function getPlayerById(
  app: App,
  playerIds: $ReadOnlyArray<string>,
  userId: string,
): Promise<PickupPlayer | null> {
  const players = await getPlayers(app, playerIds);

  return players.find(player => player.userId === userId) || null;
}
