import { createSelector } from 'reselect';
import gamemodes from '@config/gamemodes';
import { State } from '@webapp/store';
import maps from '@config/maps';
import { getCurrentRegion } from '@webapp/store/user-id/selectors';
import { makeGetPickupPlayersForId } from '@webapp/store/players/selectors';
import Player from '@typings/Player';
import classes from '@config/classes';

const getPickupQueues = (state: State) => state.pickupQueues;

const makeGetPickupQueueItem = () => createSelector(
  getPickupQueues,
  (_: State, gamemode: keyof typeof gamemodes) => gamemode,
  (queues, gamemode) => queues[gamemode],
);

const makeGetPickupQueue = () => createSelector(
  makeGetPickupQueueItem(),
  (queue) => queue.item,
);

const makeGetPickupQueueState = () => createSelector(
  makeGetPickupQueue(),
  queue => (queue === null ? null : queue.state),
);

const makeGetPickupQueueReadyUpEnd = () => createSelector(
  makeGetPickupQueue(),
  queue => (queue === null ? null : queue.readyUpEnd),
);

const makeGetPickupQueueMaps = () => createSelector(
  makeGetPickupQueue(),
  (queue): Array<keyof typeof maps> => (queue === null ? [] : queue.maps)
);

const makeGetPlayers = () => {
  const getPlayersById = makeGetPickupPlayersForId();

  return createSelector(
    (state: State) => state,
    (_: State, gamemode: keyof typeof gamemodes) => gamemode,
    getCurrentRegion,
    (state, gamemode, region) => getPlayersById(state, `${region}-${gamemode}`),
  );
};

const makeGetPlayersData = () => createSelector(
  makeGetPlayers(),
  (players): Player[] => players === null ? [] : Object.values(players),
);

const makeGetPlayerByUserId = () => {
  return createSelector(
    makeGetPlayersData(),
    (_1, _2, userId: string) => userId,
    (players, userId) => players.find(player => player.userId === userId) || null,
  );
};

const makeGetPlayerIdsForClass = () => {
  return createSelector(
    makeGetPlayersData(),
    (_1, _2, className: keyof typeof classes) => className,
    (players, className) => players
      .filter(player => player.class === className)
      .map(player => player.id),
  );
};

const makeGetPlayerDataById = () => {
  return createSelector(
    makeGetPlayersData(),
    (_1, _2, id: string) => id,
    (players, id) => players.find(player => player.id === id) || null,
  );
};

export {
  makeGetPickupQueue,
  makeGetPickupQueueItem,
  makeGetPickupQueueMaps,
  makeGetPickupQueueState,
  makeGetPickupQueueReadyUpEnd,
  makeGetPlayerByUserId,
  makeGetPickupPlayersForId,
  makeGetPlayerDataById,
  makeGetPlayerIdsForClass,
};
