import Pickup from '@typings/Pickup';
import { FeathersError } from '@feathersjs/errors';
import {
  Action,
  AsyncItem,
} from '@webapp/store';

enum PickupActionTypes {
  START_FETCH = 'PICKUP/START-FETCH',
  FETCHED = 'PICKUP/FETCHED',
  FETCH_ERROR = 'PICKUP/FETCH-ERROR',
  UPDATE = 'PICKUP/UPDATE',
}

type State = Record<string, AsyncItem<Pickup>>;

type Actions =
  | Action<typeof PickupActionTypes.START_FETCH, { pickupId: number }>
  | Action<typeof PickupActionTypes.FETCHED, { pickup: Pickup }>
  | Action<typeof PickupActionTypes.FETCH_ERROR, {
      pickupId: number,
      error: FeathersError<number, string>,
    }>
  | Action<typeof PickupActionTypes.UPDATE, { pickup: Pickup }>;

export {
  PickupActionTypes,
  Actions,
  State,
};
