import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import gamemodes from '@tf2-pickup/configs/gamemodes';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';

import BasicLayout from '../layouts/basic-layout/index';
import LandingPageView from './landing-page/index';
import { titleSuffix } from '../config';

export default class App extends PureComponent {
  static propTypes = { app: PropTypes.object.isRequired };

  state = { location: this.props.app.history.location };

  componentWillMount() {
    this.props.app.history.listen(() => {
      this.setState({ location: this.props.app.history.location });
    });
  }

  renderGamemodeRoutes() {
    return Object
      .values(gamemodes)
      .reduce((current, gamemode) => {
        const aliasRoutes = gamemode.aliases.map(alias => (
          <Route
            path={`/${alias}`}
            key={`${gamemode.name}-${alias}`}
          />
        ));

        aliasRoutes.push((
          <Route
            path={`/${gamemode.name}`}
            key={gamemode.name}
          />
        ));

        return current.concat(aliasRoutes);
      }, []);
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
                component={LandingPageView}
              />

              {this.renderGamemodeRoutes()}

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

              <Helmet
                titleTemplate={`%s ${titleSuffix}`}
                link={[{
                  rel: 'stylesheet',
                  href: 'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700',
                }, {
                  rel: 'stylesheet',
                  href: 'https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,500,500italic,700,700italic',
                }]}

                meta={[{ charset: 'utf-8' }, {
                  name: 'twitter:card',
                  content: 'summary',
                }, {
                  name: 'twitter:site',
                  content: '@TF2Pickup',
                }, {
                  name: 'twitter:title',
                  content: 'TF2Pickup.net | Web-based Pickup system',
                }, {
                  name: 'twitter:description',
                  content: [
                    'A web-based pickup system, where players can easily play',
                    'competitive Team Fortress 2 in a variety of formats',
                  ].join(' '),
                }, {
                  name: 'twitter:image',
                  content: 'summary',
                }]}
              />
            </Switch>
          </BasicLayout>
        </ConnectedRouter>
      </Provider>
    );
  }
}
