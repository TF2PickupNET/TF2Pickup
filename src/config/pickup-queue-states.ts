interface PickupQueueState {
  display: string,
}

enum PickupQueueStates {
  WaitingForPlayers = 'waiting-for-players',
  ReadyUp = 'ready-up',
  CreatingPickup = 'creating-pickup',
}

const pickupQueueStates: Record<PickupQueueStates, PickupQueueState> = {
  [PickupQueueStates.WaitingForPlayers]: { display: 'Waiting for players' },
  [PickupQueueStates.ReadyUp]: { display: 'Ready up' },
  [PickupQueueStates.CreatingPickup]: { display: 'Creating Pickup' },
};

export {
  PickupQueueStates,
  PickupQueueState,
};

export default pickupQueueStates;
