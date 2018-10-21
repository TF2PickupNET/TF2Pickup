// @flow

import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import { gamemodes } from '../../config';

import ProfileRedirect from './ProfileRedirect';
import IndexRedirect from './IndexRedirect';
import Settings from './Settings';
import Profile from './Profile';
import PickupQueue from './PickupQueue';

export default class Views extends React.PureComponent<{}> {
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
        path="/profile/:userId"
        component={Profile}
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

        <Route
          exact
          strict
          path={`/(${Object.keys(gamemodes).join('|')})`}
          component={PickupQueue}
        />

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
