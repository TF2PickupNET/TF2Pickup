import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import { Keys } from '../../utils/types';
import gamemodes from '../../config/gamemodes';

import Profile from './Profile';
import IndexRedirect from './IndexRedirect';
import NotFound from './NotFound';
import Info from './Info';
import Settings from './Settings';
import PickupQueue from './PickupQueue';
import PickupRedirect from './PickupRedirect';

const gamemodeKeys = Object.keys(gamemodes) as Keys<typeof gamemodes>;

const routes = [
  {
    path: ['/profile', '/profile/:userId'],
    component: Profile,
  },
  {
    path: gamemodeKeys.map(gamemode => `/${gamemode}`),
    component: PickupQueue,
  },
  {
    path: gamemodeKeys.reduce((paths, gamemode) => {
      return [
        ...paths,
        ...gamemodes[gamemode].aliases.map(alias => `/${alias}`),
      ];
    }, []),
    component: PickupRedirect,
  },
  {
    path: '/',
    component: IndexRedirect,
    exact: true,
    strict: true,
  },
  {
    path: '/info',
    component: Info,
  },
  {
    path: '/settings',
    component: Settings,
    strict: true,
    exact: true,
  },
  {
    path: '*',
    component: NotFound,
  },
];

function Views() {
  return (
    <Switch>
      {routes.map(route => (
        <Route
          key={Array.isArray(route.path) ? route.path[0] : route.path}
          {...route}
        />
      ))}
    </Switch>
  );
}

export default Views;
