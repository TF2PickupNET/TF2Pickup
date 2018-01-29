import React from 'react';
import { Switch, Route } from 'react-router-dom';
import gamemodes from '@tf2-pickup/configs/gamemodes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
import NotFound from './not-found';

const pickupQueueRegex = Object
  .keys(gamemodes)
  .join('|');
const aliasesRegex = Object
  .values(gamemodes)
  .map(gamemode => gamemode.aliases.join('|'))
  .join('|');

/**
 * Render the switch with the routes.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Routes(props) {
  return (
    <Switch location={props.location}>
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
        path={`/(${pickupQueueRegex})`}
        render={composeWithMainLayout(PickupQueue)}
      />

      <Route
        path={`/(${aliasesRegex})`}
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

      <Route component={NotFound} />
    </Switch>
  );
}

Routes.propTypes = { location: PropTypes.shape({}).isRequired };

export default connect(
  (state) => {
    return { location: state.router.location };
  },
)(Routes);
