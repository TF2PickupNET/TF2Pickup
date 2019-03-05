import gamemodes from '@config/gamemodes';
import {
  AsyncItem,
  Action,
} from '@webapp/store';
import Queue from '@typings/Queue';

type State = Record<keyof typeof gamemodes, AsyncItem<Queue>>;

enum QueueActionTypes {
  UPDATE = 'PICKUP-QUEUE/UPDATE',
  START_FETCH = 'PICKUP-QUEUE/START-FETCH',
  FETCHED = 'PICKUP-QUEUE/FETCHED',
  FETCH_ERROR = 'PICKUP-QUEUE/FETCH-ERROR',
}

type Actions =
  | Action<typeof QueueActionTypes.UPDATE, { queue: Queue }>
  | Action<typeof QueueActionTypes.START_FETCH, { gamemode: keyof typeof gamemodes }>
  | Action<typeof QueueActionTypes.FETCHED, { queue: Queue }>
  | Action<typeof QueueActionTypes.FETCH_ERROR, {
    error: Error,
    gamemode: keyof typeof gamemodes,
  }>;

export {
  State,
  Actions,
  QueueActionTypes,
};
