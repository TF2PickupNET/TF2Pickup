// @flow

import React, { type Node } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import { gamemodes } from '../../config';

import ProfileRedirect from './ProfileRedirect';
import IndexRedirect from './IndexRedirect';
import Settings from './Settings';

export default class Views extends React.PureComponent<{}> {
  static renderGamemodeRoutes(): Node {
    return Object.keys(gamemodes).map(gamemode => (
      <Route
        key={gamemode}
        exact
        strict
        path={`/${gamemode}`}
      />
    ));
  }

  static renderProfileRoutes() {
    return [
      <Route
        key="user-profile"
        exact
        strict
        path="/profile"
        component={ProfileRedirect}
      />,

      <Route
        key="profile-by-id"
        exact
        strict
        path="/profile/:userId(\\d+)"
      />,

      <Route
        key="profile-by-name"
        exact
        strict
        path="/profile/:username"
      />,
    ];
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          strict
          path="/"
          component={IndexRedirect}
        />

        {Views.renderGamemodeRoutes()}

        <Route
          exact
          strict
          path="/settings"
          component={Settings}
        />

        {Views.renderProfileRoutes()}
      </Switch>
    );
  }
}
