import React from 'react';
import { Redirect } from 'react-router-dom';

import { useLocation } from '../../utils/use-router';
import gamemodes from '../../../config/gamemodes';
import { Keys } from '../../../utils/types';

const gamemodeKeys = Object.keys(gamemodes) as Keys<typeof gamemodes>;

function PickupRedirect() {
  const location = useLocation();
  const alias = location.pathname.slice(1);
  const gamemode = gamemodeKeys.find(gm => gamemodes[gm].aliases.includes(alias));

  return (
    <Redirect to={`/${gamemode}`} />
  );
}

export default PickupRedirect;
