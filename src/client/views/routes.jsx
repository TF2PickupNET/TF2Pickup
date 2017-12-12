import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import app from '../app';
import { composeWithMainLayout } from '../layouts/main-layout';

import LandingPage from './landing-page';
import About from './about';
import Donate from './donate';
import Settings from './settings';
import Profile from './profile';
import PickupQueue, { RedirectToPickup } from './pickup-queue';
import Rules from './rules';
import Servers from './servers';
import RecentPickups from './recent-pickups';
import Error from './error';
import Help from './help';
import Pickup from './pickup';

/**
 * The main component.
 *
 * @class
 */
export default class Routes extends PureComponent {
  state = { location: app.history.location };

  /**
   * Listen for changes in the url.
   */
  componentWillMount() {
    app.history.listen(() => {
      this.setState({ location: app.history.location });
    });
  }

  render() {
    return (
      <Switch location={this.state.location}>
        <Route
          strict
          exact
          path="/"
          component={LandingPage}
        />

        <Route
          path="/pickup/:id"
          render={composeWithMainLayout(Pickup)}
        />

        <Route
          path={`/(${Object.keys(gamemodes).join('|')})`}
          render={composeWithMainLayout(PickupQueue)}
        />

        <Route
          path={`/(${
            Object
              .values(gamemodes)
              .map(gamemode => gamemode.aliases.join('|'))
              .join('|')
          })`}
          render={composeWithMainLayout(RedirectToPickup)}
        />

        <Route
          path="/about"
          render={composeWithMainLayout(About)}
        />

        <Route
          path="/recent-pickups"
          render={composeWithMainLayout(RecentPickups)}
        />

        <Route
          path="/donate"
          render={composeWithMainLayout(Donate)}
        />

        <Route
          path="/servers"
          render={composeWithMainLayout(Servers)}
        />

        <Route
          path="/rules"
          render={composeWithMainLayout(Rules)}
        />

        <Route
          path="/help"
          render={composeWithMainLayout(Help)}
        />

        <Route
          path="/profile"
          render={composeWithMainLayout(Profile)}
        />

        <Route
          path="/profile/:steamId"
          render={composeWithMainLayout(Profile)}
        />

        <Route
          path="/settings"
          render={composeWithMainLayout(Settings)}
        />

        <Route
          path="/error"
          component={Error}
        />
      </Switch>
    );
  }
}
