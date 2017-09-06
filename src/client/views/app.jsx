import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import BasicLayout from '../layouts/basic-layout';
import app from '../app';

import Routes from './routes';

/**
 * The main app component.
 *
 * @returns {JSX} - Returns the app.
 */
export default function App() {
  return (
    <Provider store={app.store}>
      <ConnectedRouter history={app.history}>
        <BasicLayout>
          <Routes />
        </BasicLayout>
      </ConnectedRouter>
    </Provider>
  );
}
