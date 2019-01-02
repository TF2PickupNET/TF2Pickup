import gamemodes from '../config/gamemodes';
import regions from '../config/regions';
import maps from '../config/maps';
import pickupStatus from '../config/pickup-status';

interface PickupQueue {
  status: keyof typeof pickupStatus,
  id: string,
  region: keyof typeof regions,
  gamemode: keyof typeof gamemodes,
  readyUpEnd: number | null,
  maps: [keyof typeof maps, keyof typeof maps, keyof typeof maps],
}

export default PickupQueue;
