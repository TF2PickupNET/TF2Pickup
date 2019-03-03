import classes from '@config/classes';

interface CommonPlayer {
  readonly id: string,
  readonly userId: string,
  readonly map: string | null,
  readonly isReady: boolean,
  readonly isSubbed: boolean,
  readonly class: keyof typeof classes,
  readonly joinedOn: number,
}

interface QueuePlayer extends CommonPlayer {
  readonly pickupId: null,
  readonly queueId: string,
}

interface PickupPlayer extends CommonPlayer {
  readonly pickupId: number,
  readonly queueId: null,
}

type Player = QueuePlayer | PickupPlayer;

export {
  QueuePlayer,
  PickupPlayer,
};

export default Player;
