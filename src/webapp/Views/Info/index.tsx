import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import NotFound from '@webapp/Views/NotFound';

import Rules from './Rules';
import About from './About';
import Navigation from './Navigation';

function Info() {
  return (
    <React.Fragment>
      <Navigation />

      <Switch>
        <Route
          exact
          strict
          path="/info"
          component={About}
        />

        <Route
          path="/info/rules"
          component={Rules}
        />

        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}

export default Info;
