// @flow

import maps from '../config/maps';
import classes from '../config/classes';

export interface PickupPlayer {
  id: string,
  userId: string,
  class: $Keys<typeof classes>,
  map: null | $Keys<typeof maps>,
  isReady: boolean,
}
