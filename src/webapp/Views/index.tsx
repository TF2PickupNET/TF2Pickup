import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import ProfileRedirect from './ProfileRedirect';
import IndexRedirect from './IndexRedirect';
import NotFound from './NotFound';
import LogOut from './SignOut';
import Info from "./Info";

const routes = [{
  path: '/profile',
  component: ProfileRedirect,
}, {
  path: '/',
  component: IndexRedirect,
  exact: true,
  strict: true,
}, {
  path: '/info',
  component: Info,
}, {
  path: '/sign-out',
  exact: true,
  strict: true,
  component: LogOut,
}, {
  path: '*',
  component: NotFound,
}];

function Views() {
  return (
    <Switch>
      {routes.map(route => (
        <Route
          key={route.path}
          {...route}
        />
      ))}
    </Switch>
  );
}

export default Views;
