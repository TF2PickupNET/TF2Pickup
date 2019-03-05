interface QueueState {
  display: string,
}

enum QueueStates {
  WaitingForPlayers = 'waiting-for-players',
  ReadyUp = 'ready-up',
  CreatingPickup = 'creating-pickup',
}

const queueStates: Record<QueueStates, QueueState> = {
  [QueueStates.WaitingForPlayers]: { display: 'Waiting for players' },
  [QueueStates.ReadyUp]: { display: 'Ready up' },
  [QueueStates.CreatingPickup]: { display: 'Creating Pickup' },
};

export {
  QueueStates,
  QueueState,
};

export default queueStates;
