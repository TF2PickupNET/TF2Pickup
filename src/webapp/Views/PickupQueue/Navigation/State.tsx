import React from 'react';
import { Item } from '@webapp/components/PageNavigation';
import gamemodes from '@config/gamemodes';
import {
  State as AppState,
  useMakeMapState,
} from '@webapp/store';
import { makeGetPickupQueueState } from '@webapp/store/pickup-queues/selectors';
import pickupStates from '@config/pickup-queue-states';

import { useGamemode } from '../utils';

const makeMapState = () => {
  const getPickupQueueStatus = makeGetPickupQueueState();

  return (state: AppState, gamemode: keyof typeof gamemodes) => {
    return { state: getPickupQueueStatus(state, gamemode) };
  };
};

function State() {
  const gamemode = useGamemode();
  const { state } = useMakeMapState(makeMapState, gamemode);

  if (state === null) {
    return null;
  }

  return (
    <Item
      text={(
        <React.Fragment>
          <b>State:</b> {pickupStates[state].display}
        </React.Fragment>
      )}
    />
  );
}

export default State;
