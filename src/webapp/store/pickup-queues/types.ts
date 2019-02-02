import { Action } from 'redux';

import gamemodes from '../../../config/gamemodes';
import { AsyncItem } from '../types';
import PickupQueue from '../../../types/PickupQueue';

type State = Record<keyof typeof gamemodes, AsyncItem<PickupQueue>>;

enum PickupQueueActionTypes {
  UPDATE = 'PICKUP-QUEUE/UPDATE',
  START_FETCH = 'PICKUP-QUEUE/START-FETCH',
  FETCHED = 'PICKUP-QUEUE/FETCHED',
  FETCH_ERROR = 'PICKUP-QUEUE/FETCH-ERROR',
}

type Actions =
  | Action<typeof PickupQueueActionTypes.UPDATE, { queue: PickupQueue }>
  | Action<typeof PickupQueueActionTypes.START_FETCH, { gamemode: keyof typeof gamemodes }>
  | Action<typeof PickupQueueActionTypes.FETCHED, { queue: PickupQueue }>
  | Action<typeof PickupQueueActionTypes.FETCH_ERROR, {
    error: Error,
    gamemode: keyof typeof gamemodes,
  }>;

export {
  State,
  Actions,
  PickupQueueActionTypes,
};
