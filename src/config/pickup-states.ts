interface PickupState {
  name: string,
  display: string,
}

const waitingForPlayers: PickupState = {
  name: 'waiting-for-players',
  display: 'Waiting for players',
};
const readyUp: PickupState = {
  name: 'ready-up',
  display: 'Ready up',
};
const reservingServer: PickupState = {
  name: 'reserving-server',
  display: 'Reserving server',
};
const configuringServer: PickupState = {
  name: 'configuring-server',
  display: 'Configuring server',
};

const pickupStates = {
  'waiting-for-players': waitingForPlayers,
  'ready-up': readyUp,
  'reserving-server': reservingServer,
  'configuring-server': configuringServer,
};

export default pickupStates;
