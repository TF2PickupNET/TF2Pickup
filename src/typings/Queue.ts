import gamemodes from '@config/gamemodes';
import regions from '@config/regions';
import maps from '@config/maps';
import { QueueStates } from '@config/queue-states';

interface Queue {
  readonly state: QueueStates,
  readonly id: string,
  readonly region: keyof typeof regions,
  readonly gamemode: keyof typeof gamemodes,
  readonly readyUpEnd: number | null,
  readonly maps: Array<keyof typeof maps>,
}

export default Queue;
