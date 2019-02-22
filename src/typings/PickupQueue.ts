import gamemodes from '@config/gamemodes';
import regions from '@config/regions';
import maps from '@config/maps';
import { PickupQueueStates } from '@config/pickup-queue-states';

interface PickupQueue {
  readonly state: PickupQueueStates,
  readonly id: string,
  readonly region: keyof typeof regions,
  readonly gamemode: keyof typeof gamemodes,
  readonly readyUpEnd: number | null,
  readonly maps: Array<keyof typeof maps>,
}

export default PickupQueue;
