// @flow

import { type Action } from 'redux';

import { gamemodes } from '../../../config';
import { type PickupQueue } from '../../../types/PickupQueue';

type State = { [key: $Keys<typeof gamemodes>]: PickupQueue | null };
type Actions = Action<'PICKUP-QUEUES/UPDATE', { queue: PickupQueue }>
  | Action<'PICKUP-QUEUES/FETCHED', {
      gamemode: $Keys<typeof gamemodes>,
      queue: PickupQueue,
    }>
  | Action<'PICKUP-QUEUES/RESET', {}>;

const UPDATE_QUEUE = 'PICKUP-QUEUES/UPDATE';
const FETCHED_QUEUE = 'PICKUP-QUEUES/FETCHED';
const RESET_QUEUES = 'PICKUP-QUEUES/RESET';

export type {
  State,
  Actions,
};

export {
  UPDATE_QUEUE,
  FETCHED_QUEUE,
  RESET_QUEUES,
};
