// @flow

import { type Action } from 'redux';

import { gamemodes } from '../../../config';
import { type PickupQueue } from '../../../types/PickupQueue';

type State = { [key: $Keys<typeof gamemodes>]: PickupQueue | null };

type UpdatePickupQueue = Action<'PICKUP-QUEUES/UPDATE', { queue: PickupQueue }>;
type FetchedPickupQueue = Action<'PICKUP-QUEUES/FETCHED', { queue: PickupQueue }>;
type ResetPickupQueue = Action<'PICKUP-QUEUES/RESET', {}>;

type Actions = UpdatePickupQueue | FetchedPickupQueue | ResetPickupQueue;

const UPDATE_QUEUE = 'PICKUP-QUEUES/UPDATE';
const FETCHED_QUEUE = 'PICKUP-QUEUES/FETCHED';
const RESET_QUEUES = 'PICKUP-QUEUES/RESET';

export type {
  UPDATE_QUEUE,
  FETCHED_QUEUE,
  RESET_QUEUES,

  State,
  Actions,
  UpdatePickupQueue,
  FetchedPickupQueue,
  ResetPickupQueue,
};
