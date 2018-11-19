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
