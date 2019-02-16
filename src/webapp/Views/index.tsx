import React from 'react';
import {
  Router,
  Redirect,
} from '@reach/router';

import { Keys } from '@utils/types';
import gamemodes from '@config/gamemodes';

import Profile from './Profile';
import IndexRedirect from './IndexRedirect';
import NotFound from './NotFound';
import Info from './Info';
import Settings from './Settings';
import PickupQueue from './PickupQueue';
import About from '@webapp/Views/About';
import Rules from '@webapp/Views/Rules';
import ProfileRedirect from '@webapp/Views/ProfileRedirect';

const gamemodeKeys = Object.keys(gamemodes) as Keys<typeof gamemodes>;
const gamemodeAliases = gamemodeKeys
  .map(gamemode => gamemodes[gamemode].aliases.map(alias => {
    return {
      path: `/${alias}`,
      to: `/${gamemode}`,
    };
  }))
  .reduce((paths, aliasPaths) => [
    ...paths,
    ...aliasPaths,
  ], []);

function Views() {
  return (
    <Router>
      <IndexRedirect path="/" />

      <React.Fragment path="/profile">
        <ProfileRedirect path="/" />

        <Profile path="/:userId" userId="" />
      </React.Fragment>

      {gamemodeKeys.map(gamemode => (
        <PickupQueue
          path={`/${gamemode}`}
          gamemode={gamemode}
        />
      ))}

      {gamemodeAliases.map(alias => (
        <Redirect {...alias} />
      ))}

      <Info path="/info">
        <About path="/" />

        <Rules path="/rules" />
      </Info>

      <Settings path="/settings" />

      <NotFound default />
    </Router>
  );
}

export default Views;
