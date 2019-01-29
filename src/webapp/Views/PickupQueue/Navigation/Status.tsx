import React from 'react';

import { Item } from '../../../components/PageNavigation';
import { useGamemode } from '../utils';
import gamemodes from '../../../../config/gamemodes';
import { State, useMakeMapState } from '../../../store';
import { makeGetPickupQueueStatus } from '../../../store/pickup-queues/selectors';

const makeMapState = () => {
  const getPickupQueueStatus = makeGetPickupQueueStatus();

  return (state: State, gamemode: keyof typeof gamemodes) => {
    return { status: getPickupQueueStatus(state, gamemode) };
  };
};

function Status() {
  const gamemode = useGamemode();
  const { status } = useMakeMapState(makeMapState, gamemode);

  return (
    <Item
      text={(
        <React.Fragment>
          <b>Status:</b> {status}
        </React.Fragment>
      )}
    />
  );
}

export default Status;
