// @flow

import React, { lazy } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import { gamemodes } from '../../config';
import createLazyRoute from '../utils/create-lazy-route';

import ProfileRedirect from './ProfileRedirect';
import IndexRedirect from './IndexRedirect';

const Settings = lazy(() => import(/* webpackChunkName: "settings" */ './Settings'));
const Profile = lazy(() => import(/* webpackChunkName: "profile" */ './Profile'));
const PickupQueue = lazy(() => import(/* webpackChunkName: "pickup-queue" */'./PickupQueue'));

export default class Views extends React.PureComponent<{}> {
  static renderProfileRoutes() {
    return [
      <Route
        key="user-profile"
        exact
        strict
        path="/profile"
        component={createLazyRoute(ProfileRedirect)}
      />,

      <Route
        key="profile-by-id"
        exact
        strict
        path="/profile/:userId"
        component={createLazyRoute(Profile)}
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
          component={createLazyRoute(IndexRedirect)}
        />

        <Route
          exact
          strict
          path={`/(${Object.keys(gamemodes).join('|')})`}
          component={createLazyRoute(PickupQueue)}
        />

        <Route
          exact
          strict
          path="/settings"
          component={createLazyRoute(Settings)}
        />

        {Views.renderProfileRoutes()}
      </Switch>
    );
  }
}
