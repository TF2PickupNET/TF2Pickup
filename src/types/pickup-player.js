// @flow

import maps from '../config/maps';

export type PickupPlayer = {
  id: string,
  userId: string,
  map: null | $Keys<typeof maps>,
  isReady: boolean,
};
