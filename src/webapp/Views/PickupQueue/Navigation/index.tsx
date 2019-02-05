import React from 'react';

import PageNavigation, { Header } from '@webapp/components/PageNavigation';
import { useGamemode } from '../utils';
import gamemodes from '@config/gamemodes';

import Status from './Status';

function Navigation() {
  const gamemode = useGamemode();

  return (
    <PageNavigation>
      <Header text={gamemodes[gamemode].display} />

      <Status />
    </PageNavigation>
  );
}

export default Navigation;
