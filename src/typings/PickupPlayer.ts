import classes from '@config/classes';

interface PickupPlayer {
  readonly id: string,
  readonly userId: string,
  readonly map: string | null,
  readonly isReady: boolean,
  readonly isSubbed: boolean,
  readonly pickupId: number | null,
  readonly queueId: string | null,
  readonly class: keyof typeof classes,
  readonly joinedOn: number,
}

export default PickupPlayer;
