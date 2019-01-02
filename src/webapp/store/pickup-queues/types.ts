import gamemodes from "../../../config/gamemodes";
import {AsyncItem} from "../types";
import PickupQueue from "../../../types/PickupQueue";
import {Action} from "redux";

type State = Record<keyof typeof gamemodes, AsyncItem<PickupQueue>>;

const UPDATE_PICKUP_QUEUE = 'PICKUP-QUEUE/UPDATE';
const START_FETCH_PICKUP_QUEUE = 'PICKUP-QUEUE/START-FETCHED';
const FETCHED_PICKUP_QUEUE = 'PICKUP-QUEUE/FETCHED';
const FETCH_ERROR_PICKUP_QUEUE = 'PICKUP-QUEUE/FETCH-ERROR';

type Actions =
  | Action<typeof UPDATE_PICKUP_QUEUE, { queue: PickupQueue }>
  | Action<typeof START_FETCH_PICKUP_QUEUE, { gamemode: keyof typeof gamemodes }>
  | Action<typeof FETCHED_PICKUP_QUEUE, { queue: PickupQueue }>
  | Action<typeof FETCH_ERROR_PICKUP_QUEUE, {
      error: Error,
      gamemode: keyof typeof gamemodes,
    }>;

export {
  State,
  Actions,
  UPDATE_PICKUP_QUEUE,
  START_FETCH_PICKUP_QUEUE,
  FETCH_ERROR_PICKUP_QUEUE,
  FETCHED_PICKUP_QUEUE,
};
