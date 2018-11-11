// @flow

import React, { lazy } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import { gamemodes } from '../../config';

import ProfileRedirect from './ProfileRedirect';
import IndexRedirect from './IndexRedirect';

const Settings = lazy(() => import(/* webpackChunkName: "settings" */ './Settings'));
const Profile = lazy(() => import(/* webpackChunkName: "profile" */ './Profile'));
const PickupQueue = lazy(() => import(/* webpackChunkName: "pickup-queue" */'./PickupQueue'));

const routes = [{
  path: '/profile',
  component: ProfileRedirect,
}, {
  path: '/profile/:userId',
  component: Profile,
}, {
  path: '/',
  component: IndexRedirect,
}, {
  path: `/(${Object.keys(gamemodes).join('|')})`,
  component: PickupQueue,
}, {
  path: '/settings',
  component: Settings,
}];

function Views() {
  return (
    <Switch>
      {routes.map(route => (
        <Route
          key={route.path}
          exact
          strict
          {...route}
        />
      ))}
    </Switch>
  );
}

export default Views;
