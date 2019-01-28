import React from 'react';

import PageNavigation, {
  Header,
  Item,
} from '../../../components/PageNavigation';
import { useGamemode } from '../utils';
import gamemodes from '../../../../config/gamemodes';
import { State } from '../../../store';
import { makeGetPickupQueueStatus } from '../../../store/pickup-queues/selectors';

const makeMapState = (state: State, gamemode: keyof typeof gamemodes) => {
  return {
    status: makeGetPickupQueueStatus(state, gamemode),
  };
};

function Navigation() {
  const gamemode = useGamemode();


  return (
    <PageNavigation>
      <Header text={gamemodes[gamemode].display} />

      <Item text={(
        <React.Fragment>
          <b>Status:</b>
        </React.Fragment>
      )}/>
    </PageNavigation>
  );
}

export default Navigation;
