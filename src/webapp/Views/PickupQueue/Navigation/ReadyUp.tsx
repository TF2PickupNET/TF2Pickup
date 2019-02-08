import React, { useState, useEffect } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import { differenceInMilliseconds } from 'date-fns';
import gamemodes from '@config/gamemodes';
import { State, useMakeMapState } from '@webapp/store';
import {
  makeGetPickupQueueState,
  makeGetPickupQueueReadyUpEnd,
} from '@webapp/store/pickup-queues/selectors';

import { useGamemode } from '../utils';

const makeMapState = () => {
  const getPickupQueueStatus = makeGetPickupQueueState();
  const getPickupQueueReadyUpEnd = makeGetPickupQueueReadyUpEnd();

  return (state: State, gamemode: keyof typeof gamemodes) => {
    return {
      state: getPickupQueueStatus(state, gamemode),
      readyUpEnd: getPickupQueueReadyUpEnd(state, gamemode),
    };
  };
};

function useProgressState(gamemode: keyof typeof gamemodes,isReady: boolean, end: number) {
  const [progress, setProgress] = useState(0);
  const {readyUpTime} = gamemodes[gamemode];
  const updateProgress = () => {
    requestAnimationFrame(() => {
      const diff = differenceInMilliseconds(Date.now(), end);

      setProgress(
        Math.max(0, Math.min(100, diff / readyUpTime * 100))
      );

      updateProgress();
    });
  };

  useEffect(() => {
    setProgress(0);

    if (isReady) {
      updateProgress();
    }
  }, [isReady]);

  return progress;
}

function Status() {
  const gamemode = useGamemode();
  const { state } = useMakeMapState(makeMapState, gamemode);
  const isReadyUpState = state === 'ready-up';
  const progress = useProgressState(gamemode, isReadyUpState, 0);

  if (!isReadyUpState) {
    return null;
  }

  return (
    <span>
      Do you want to ready up?

      <span>
        <span style={{ width: `${progress}%` }} />
      </span>

      <ButtonGroup>
        <Button>Yes</Button>
        <Button>No</Button>
      </ButtonGroup>
    </span>
  );
}

export default Status;
