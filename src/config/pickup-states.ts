interface PickupState {
  display: string,
}

enum PickupStates {
  ReservingServer = 'reserving-server',
  ConfiguringServer = 'configuring-server',
  WaitingForReadyUp = 'waiting-for-ready-up',
  Running = 'running',
  Finished = 'finished',
  Aborted = 'aborted',
}

const pickupStates: Record<PickupStates, PickupState> = {
  [PickupStates.ReservingServer]: { display: 'Reserving a server' },
  [PickupStates.ConfiguringServer]: { display: 'Configuring server' },
  [PickupStates.WaitingForReadyUp]: { display: 'Waiting for ready-up' },
  [PickupStates.Running]: { display: 'Running' },
  [PickupStates.Finished]: { display: 'Finished' },
  [PickupStates.Aborted]: { display: 'Aborted' },
};

export {
  PickupStates,
  PickupState,
};

export default pickupStates;
