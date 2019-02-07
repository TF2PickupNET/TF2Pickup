import classes from '@config/classes';

interface PickupPlayer {
  id: string,
  userId: string,
  map: string | null,
  isReady: boolean,
  isSubbed: boolean,
  pickupId: number | null,
  queueId: string | null,
  class: keyof typeof classes,
  joinedOn: number,
}

export default PickupPlayer;
