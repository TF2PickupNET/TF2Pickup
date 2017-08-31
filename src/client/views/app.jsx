/* eslint-disable react/jsx-no-bind */

import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import { titleSuffix } from '../config';
import BasicLayout from '../layouts/basic-layout';

import LandingPage from './landing-page';
import RedirectToPickup from './pickup/redirect-to-pickup';

/**
 * The main component.
 *
 * @class
 */
export default class App extends PureComponent {
  // eslint-disable-next-line react/forbid-prop-types
  static propTypes = { app: PropTypes.object.isRequired };

  /**
   * Render all of the gamemode routes and their corresponding aliases.
   *
   * @returns {JSX} - Returns the routes for the gamemodes.
   */
  static renderGamemodeRoutes() {
    return Object
      .values(gamemodes)
      .reduce((current, gamemode) => {
        const routes = gamemode.aliases.map(alias => (
          <Route
            path={`/${alias}`}
            key={`${gamemode.name}-${alias}`}
            render={() => <RedirectToPickup to={`/${gamemode.name}`} />}
          />
        ));

        routes.push((
          <Route
            path={`/${gamemode.name}`}
            key={gamemode.name}
          />
        ));

        return current.concat(routes);
      }, []);
  }

  state = { location: this.props.app.history.location };

  /**
   * Listen for changes in the url.
   */
  componentWillMount() {
    this.props.app.history.listen(() => {
      this.setState({ location: this.props.app.history.location });
    });
  }

  render() {
    const { app } = this.props;

    return (
      <Provider store={app.store}>
        <ConnectedRouter history={app.history}>
          <BasicLayout>
            <Switch location={this.state.location}>
              <Route
                strict
                exact
                path="/"
                component={LandingPage}
              />

              {App.renderGamemodeRoutes()}

              <Route
                exact
                path="/about"
              />

              <Route
                exact
                path="/help"
              />

              <Route
                exact
                path="/rules"
              />

              <Route
                exact
                path="/join-slot/:gamemode/:class"
              />

              <Route
                exact
                path="/profile"
              />

              <Route
                exact
                path="/profile/:steamId"
              />

              <Route
                exact
                path="/settings"
              />
            </Switch>

            <Helmet titleTemplate="%s | TF2Pickup.net">
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700"
              />
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,500,500italic,700,700italic"
              />
              <meta charSet="utf-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <meta
                name="twitter:card"
                content="summary"
              />
              <meta
                name="twitter:site"
                content="@TF2Pickup"
              />
              <meta
                name="twitter:title"
                content="TF2Pickup.net | Web-based Pickup system"
              />
              <meta
                name="twitter:description"
                content={[
                  'A web-based pickup system, where players can easily play',
                  'competitive Team Fortress 2 in a variety of formats',
                ].join(' ')}
              />
              <meta
                name="twitter:image"
                content="/assets/images/icons/logo.png"
              />

              <link
                rel="shortcut icon"
                type="image/x-icon"
                href="/assets/images/favicon.ico"
              />

            </Helmet>
          </BasicLayout>
        </ConnectedRouter>
      </Provider>
    );
  }
}
