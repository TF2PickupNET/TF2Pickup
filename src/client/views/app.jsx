import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { JssProvider } from 'react-jss';

import BasicLayout from '../layouts/basic-layout';
import app from '../app';
import jss from '../jss';
import { isDev } from '../../config/client';

import ThemeProvider from './theme-provider';
import Routes from './routes';

const MAX_RULES = 1e10;
let ruleCounter = 0;

/**
 * Generate the class name for a style rule.
 *
 * @param {Object} rule - The rules object.
 * @returns {String} - Returns the rules classname.
 */
function generateClassName(rule) {
  ruleCounter += 1;

  if (ruleCounter > MAX_RULES) {
    throw new Error('The rule counter got bigger than the max rules!');
  }

  if (isDev) {
    return `${rule.key}-${ruleCounter}`;
  }

  return `c${ruleCounter}`;
}

/**
 * The main app component.
 *
 * @returns {JSX} - Returns the app.
 */
export default function App() {
  return (
    <JssProvider
      jss={jss}
      generateClassName={generateClassName}
    >
      <Provider store={app.store}>
        <ConnectedRouter history={app.history}>
          <ThemeProvider>
            <BasicLayout>
              <Routes />
            </BasicLayout>
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    </JssProvider>
  );
}
