import React from 'react';

import PageNavigation, { Header, Item } from '../../../components/PageNavigation';
import { useGamemode } from '../utils';
import gamemodes from '../../../../config/gamemodes';
import { State, useMakeMapState } from '../../../store';
import { makeGetPickupQueueStatus } from '../../../store/pickup-queues/selectors';
import { AsyncStatus } from '../../../store/types';

const makeMapState = () => {
  const getPickupQueueStatus = makeGetPickupQueueStatus();

  return (state: State, gamemode: keyof typeof gamemodes) => {
    return {
      status: getPickupQueueStatus(state, gamemode),
    };
  };
};

function Navigation() {
  const gamemode = useGamemode();
  const { status } = useMakeMapState(makeMapState, gamemode);


  return (
    <PageNavigation>
      <Header text={gamemodes[gamemode].display} />

      {status === AsyncStatus.SUCCESS && (
        <Status />
      )}
    </PageNavigation>
  );
}

export default Navigation;
