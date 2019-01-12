import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Navigation from './Navigation';

function Profile() {
  return (
    <React.Fragment>
      <Navigation />

      <Switch>
        <Route
          strict
          exact
          path="/:userId"
        />
      </Switch>
    </React.Fragment>
  );
}

export default Profile;
