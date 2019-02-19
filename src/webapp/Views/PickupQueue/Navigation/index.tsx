import React, { useContext } from 'react';
import PageNavigation, { Header } from '@webapp/components/PageNavigation';
import gamemodes from '@config/gamemodes';
import { GamemodeContext } from '@webapp/Views/PickupQueue';
import { MenuSection, Separator } from '@atlaskit/navigation-next';

import State from './State';
import ReadyUp from './ReadyUp';
import Maps from './Maps';

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

            <Separator />

            <Maps />

            <Separator />
          </div>
        )}
      </MenuSection>
    </PageNavigation>
  );
}

export default Navigation;
