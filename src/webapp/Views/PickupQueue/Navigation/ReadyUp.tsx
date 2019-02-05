import React, { useState, useEffect } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';

import { Item } from '@webapp/components/PageNavigation';
import gamemodes from '@config/gamemodes';
import { State, useMakeMapState } from '@webapp/store';
import { makeGetPickupQueueState } from '@webapp/store/pickup-queues/selectors';
import pickupStates from '@config/pickup-states';
import { useGamemode } from '../utils';

const makeMapState = () => {
  const getPickupQueueStatus = makeGetPickupQueueState();

  return (state: State, gamemode: keyof typeof gamemodes) => {
    return { state: getPickupQueueStatus(state, gamemode) };
  };
};

const loop = () => {

};

function useProgressState(isReady: boolean) {
  const [progress, setProgress] = useState(0);

  requestAnimationFrame(() => {

  });

  useEffect(() => {
    setProgress(0);

    if (isReady) {
      // TODO: Start interval
    }
  }, [isReady]);

  return progress;
}

function Status() {
  const gamemode = useGamemode();
  const { state } = useMakeMapState(makeMapState, gamemode);
  const isReadyUpState = state === 'ready-up';
  const progress = useProgressState(isReadyUpState);

  if (!isReadyUpState) {
    return null;
  }

  return (
    <span>
      Do you want to ready up?

      <ButtonGroup>
        <Button>Yes</Button>
        <Button>No</Button>
      </ButtonGroup>
    </span>
  );
}

export default Status;
