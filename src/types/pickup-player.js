// @flow

import maps from '../config/maps';
import classes from '../config/classes';

export type PickupPlayer = {
  id: string,
  userId: string,
  class: $Keys<typeof classes>,
  map: null | $Keys<typeof maps>,
  isReady: boolean,
};
