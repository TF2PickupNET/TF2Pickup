// @flow

type Status = {|
  name: string,
  display: string,
|};

const waitingForPlayers: Status = {
  name: 'waiting-for-players',
  display: 'Waiting for players',
};
const readyUp: Status = {
  name: 'ready-up',
  display: 'Ready up',
};
const reservingServer: Status = {
  name: 'reserving-server',
  display: 'Reserving server',
};
const configuringServer: Status = {
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
