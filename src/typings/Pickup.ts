import maps from '@config/maps';
import pickupStates from '@config/pickup-states';

interface Pickup {
  id: number,
  map: keyof typeof maps,
  state: keyof typeof pickupStates,
  startDate: number,
  endDate: number,
}

export default Pickup;
