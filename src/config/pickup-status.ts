interface PickupStatus {
  name: string,
  display: string,
}

const waitingForPlayers: PickupStatus = {
  name: 'waiting-for-players',
  display: 'Waiting for players',
};
const readyUp: PickupStatus = {
  name: 'ready-up',
  display: 'Ready up',
};
const reservingServer: PickupStatus = {
  name: 'reserving-server',
  display: 'Reserving server',
};
const configuringServer: PickupStatus = {
  name: 'configuring-server',
  display: 'Configuring server',
};

const pickupStatus = {
  'waiting-for-players': waitingForPlayers,
  'ready-up': readyUp,
  'reserving-server': reservingServer,
  'configuring-server': configuringServer,
};

export default pickupStatus;
