import { State, AsyncStatus } from '@webapp/store';
import { createSelector } from 'reselect';

const getPickups = (state: State) => state.pickups;

const makeGetPickupStatusById = () => createSelector(
  getPickups,
  (_: State, pickupId: number) => pickupId,
  (pickups, pickupId) => pickupId in pickups ? pickups[pickupId].status : AsyncStatus.NOT_STARTED,
);

const makeGetPickupById = () => createSelector(
  getPickups,
  (_: State, pickupId: number) => pickupId,
  (pickups, pickupId) => pickupId in pickups ? pickups[pickupId].item : null,
);

const makeGetPickupErrorById = () => createSelector(
  getPickups,
  (_: State, pickupId: number) => pickupId,
  (pickups, pickupId) => pickupId in pickups ? pickups[pickupId].error : null,
);

export {
  makeGetPickupById,
  makeGetPickupErrorById,
  makeGetPickupStatusById,
};
