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
import RouteContainer from '@webapp/Views/RouteContainer';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
  main: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'row',
    flex: 1,
  },
};

const gamemodeKeys = Object.keys(gamemodes) as Keys<typeof gamemodes>;
const gamemodeAliases = gamemodeKeys
  .map(gamemode => gamemodes[gamemode].aliases.map(alias => {
    return {
      from: `/${alias}`,
      to: `/${gamemode}`,
    };
  }))
  .reduce((paths, aliasPaths) => [
    ...paths,
    ...aliasPaths,
  ], []);

type Props = WithStyles<typeof styles>;

function Views(props: Props) {
  return (
    <Router className={props.classes.main} component="main">
      <IndexRedirect path="/" />

      <RouteContainer path="/profile">
        <ProfileRedirect path="/" />

        <Profile path="/:userId" userId="" />
      </RouteContainer>

      {gamemodeKeys.map(gamemode => (
        <PickupQueue
          key={gamemode}
          path={`/${gamemode}`}
          gamemode={gamemode}
        />
      ))}

      {gamemodeAliases.map(alias => (
        <Redirect
          noThrow
          key={alias.from}
          {...alias}
        />
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

export default withStyles(styles)(Views);
