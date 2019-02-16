import React, { useContext } from 'react';
import PageNavigation, { Header } from '@webapp/components/PageNavigation';
import gamemodes from '@config/gamemodes';
import { GamemodeContext } from '@webapp/Views/PickupQueue';

import State from './State';

function Navigation() {
  const gamemode = useContext(GamemodeContext);

  return (
    <PageNavigation>
      <Header text={gamemodes[gamemode].display} />

      <State />
    </PageNavigation>
  );
}

export default Navigation;
