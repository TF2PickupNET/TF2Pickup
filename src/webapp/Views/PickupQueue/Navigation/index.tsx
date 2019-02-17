import React, { useContext } from 'react';
import PageNavigation, { Header } from '@webapp/components/PageNavigation';
import gamemodes from '@config/gamemodes';
import { GamemodeContext } from '@webapp/Views/PickupQueue';
import { MenuSection } from '@atlaskit/navigation-next';

import State from './State';
import ReadyUp from './ReadyUp';

function Navigation() {
  const gamemode = useContext(GamemodeContext);

  return (
    <PageNavigation>
      <Header text={gamemodes[gamemode].display} />

      <MenuSection>
        {({ className }) => (
          <div className={className}>
            <ReadyUp />

            <State />
          </div>
        )}
      </MenuSection>
    </PageNavigation>
  );
}

export default Navigation;
