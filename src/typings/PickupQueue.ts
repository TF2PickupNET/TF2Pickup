import gamemodes from '@config/gamemodes';
import regions from '@config/regions';
import maps from '@config/maps';
import pickupStates from '@config/pickup-states';

interface PickupQueue {
  state: keyof typeof pickupStates,
  id: string,
  region: keyof typeof regions,
  gamemode: keyof typeof gamemodes,
  readyUpEnd: number | null,
  maps: [keyof typeof maps, keyof typeof maps, keyof typeof maps],
}

export default PickupQueue;
