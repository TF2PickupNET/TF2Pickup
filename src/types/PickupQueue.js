// @flow

import {
  gamemodes,
  regions,
} from '../config';
import maps from '../config/maps';
import pickupStatus from '../config/pickup-status';

export interface PickupQueue {
  status: $Keys<typeof pickupStatus>,
  id: string,
  region: $Keys<typeof regions>,
  gamemode: $Keys<typeof gamemodes>,
  readyUpEnd: Date,
  players: $ReadOnlyArray<string>,
  maps: [$Keys<typeof maps>, $Keys<typeof maps>, $Keys<typeof maps>],
}
