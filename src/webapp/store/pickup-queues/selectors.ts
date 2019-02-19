import { createSelector } from 'reselect';
import gamemodes from '@config/gamemodes';
import { State } from '@webapp/store';
import maps from '@config/maps';

const getPickupQueues = (state: State) => state.pickupQueues;

const makeGetPickupQueue = () => createSelector(
  getPickupQueues,
  (_: State, gamemode: keyof typeof gamemodes) => gamemode,
  (queues, gamemode) => queues[gamemode].item,
);

const makeGetPickupQueueStatus = () => createSelector(
  getPickupQueues,
  (_: State, gamemode: keyof typeof gamemodes) => gamemode,
  (queues, gamemode) => queues[gamemode].status,
);

const makeGetPickupQueueError = () => createSelector(
  getPickupQueues,
  (_: State, gamemode: keyof typeof gamemodes) => gamemode,
  (queues, gamemode) => queues[gamemode].error,
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

export {
  makeGetPickupQueue,
  makeGetPickupQueueError,
  makeGetPickupQueueMaps,
  makeGetPickupQueueStatus,
  makeGetPickupQueueState,
  makeGetPickupQueueReadyUpEnd,
};
