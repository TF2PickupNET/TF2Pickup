import { createSelector } from 'reselect';
import { State } from '@webapp/store';
import PickupPlayer from '@typings/PickupPlayer';

const getPickupPlayers = (state: State) => state.pickupPlayers;

const makeGetPickupPlayersForId = () => createSelector(
  getPickupPlayers,
  (_: State, id: string | number) => id,
  (players, id) => id in players ? players[id].item : null,
);

const makeGetPickupPlayerIds = () => createSelector(
  makeGetPickupPlayersForId(),
  players => players === null ? [] : Object.keys(players),
);

const makeGetPickupPlayersData = () => createSelector(
  makeGetPickupPlayersForId(),
  (players): PickupPlayer[] => players === null ? [] : Object.values(players),
);

const makeGetPlayerById = () => createSelector(
  makeGetPickupPlayersForId(),
  (_1, _2, playerId: string) => playerId,
  (players, playerId) => players === null ? null : players[playerId],
);

const makeGetPlayerByUserId = () => createSelector(
  makeGetPickupPlayersData(),
  (_1, _2, userId: string) => userId,
  (players, userId) => players.find(player => player.userId === userId) || null,
);

export {
  makeGetPlayerById,
  makeGetPlayerByUserId,
  makeGetPickupPlayerIds,
  makeGetPickupPlayersData,
  makeGetPickupPlayersForId,
};
