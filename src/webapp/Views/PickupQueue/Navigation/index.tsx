import React from 'react';
import PageNavigation, { Header } from '@webapp/components/PageNavigation';
import gamemodes from '@config/gamemodes';

import { useGamemode } from '../utils';

import Status from './State';

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
