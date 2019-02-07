interface PickupState {
  display: string,
}

enum PickupStates {
  WaitingForPlayers = 'waiting-for-players',
  ReadyUp = 'ready-up',
  CreatingPickup = 'creating-pickup',
  ReservingServer = 'reserving-server',
  ConfiguringServer = 'configuring-server',
}

const pickupStates: Record<PickupStates, PickupState> = {
  [PickupStates.WaitingForPlayers]: { display: 'Waiting for players' },
  [PickupStates.ReadyUp]: { display: 'Ready up' },
  [PickupStates.CreatingPickup]: { display: 'Creating Pickup' },
  [PickupStates.ReservingServer]: { display: 'Reserving server' },
  [PickupStates.ConfiguringServer]: { display: 'Configuring server' },
};

export {
  PickupStates,
  PickupState,
};

export default pickupStates;
