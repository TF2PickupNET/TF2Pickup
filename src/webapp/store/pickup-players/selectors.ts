import { createSelector } from 'reselect';
import { State } from '@webapp/store';

const getPickupPlayers = (state: State) => state.pickupPlayers;

const makeGetPickupPlayersForId = () => createSelector(
  getPickupPlayers,
  (_: State, id: string | number) => id,
  (players, id) => id in players ? players[id].item : null,
);

export {
  makeGetPickupPlayersForId,
};
