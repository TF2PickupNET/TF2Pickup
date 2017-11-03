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
import Pickup, { RedirectToPickup } from './pickup';
import Rules from './rules';
import Servers from './servers';
import RecentPickups from './recent-pickups';
import Error from './error';

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
          path={`/(${Object.keys(gamemodes).join('|')})`}
          render={composeWithMainLayout(Pickup)}
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
          exact
          path="/about"
          render={composeWithMainLayout(About)}
        />

        <Route
          exact
          path="/recent-pickups"
          render={composeWithMainLayout(RecentPickups)}
        />

        <Route
          exact
          path="/donate"
          render={composeWithMainLayout(Donate)}
        />

        <Route
          exact
          path="/servers"
          render={composeWithMainLayout(Servers)}
        />

        <Route
          exact
          path="/rules"
          render={composeWithMainLayout(Rules)}
        />

        <Route
          exact
          path="/profile"
          render={composeWithMainLayout(Profile)}
        />

        <Route
          exact
          path="/profile/:steamId"
          render={composeWithMainLayout(Profile)}
        />

        <Route
          exact
          path="/settings"
          render={composeWithMainLayout(Settings)}
        />

        <Route
          exact
          path="/error"
          component={Error}
        />
      </Switch>
    );
  }
}
