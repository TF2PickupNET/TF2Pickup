import React from 'react';
import {
  Redirect,
  ContextRouter,
} from 'react-router-dom';
import gamemodes from '@config/gamemodes';
import { Keys } from '@utils/types';

const gamemodeKeys = Object.keys(gamemodes) as Keys<typeof gamemodes>;

function PickupRedirect(props: ContextRouter) {
  const alias = props.location.pathname.slice(1);
  const gamemode = gamemodeKeys.find(gm => gamemodes[gm].aliases.includes(alias));

  return (
    <Redirect to={`/${gamemode}`} />
  );
}

export default PickupRedirect;
