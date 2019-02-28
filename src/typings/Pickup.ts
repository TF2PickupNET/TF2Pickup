import maps from '@config/maps';
import { PickupStates } from '@config/pickup-states';
import regions from '@config/regions';
import gamemodes from '@config/gamemodes';

interface Pickup {
  readonly id: number,
  readonly map: keyof typeof maps,
  readonly state: PickupStates,
  readonly createdOn: number,
  readonly startDate: number | null,
  readonly endDate: number | null,
  readonly region: keyof typeof regions,
  readonly gamemode: keyof typeof gamemodes,
}

export default Pickup;
