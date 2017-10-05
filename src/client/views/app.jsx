import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { JssProvider } from 'react-jss';

import BasicLayout from '../layouts/basic-layout';
import app from '../app';
import jss from '../jss';

import Routes from './routes';

/**
 * The main app component.
 *
 * @returns {JSX} - Returns the app.
 */
export default function App() {
  return (
    <JssProvider jss={jss}>
      <Provider store={app.store}>
        <ConnectedRouter history={app.history}>
          <BasicLayout>
            <Routes />
          </BasicLayout>
        </ConnectedRouter>
      </Provider>
    </JssProvider>
  );
}
