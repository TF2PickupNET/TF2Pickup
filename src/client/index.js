/* eslint-disable no-console */

import 'normalize.css';
import 'mdi/css/materialdesignicons.min.css';
import './babel-helpers';

import React from 'react';
import ReactDOM from 'react-dom';

import { isDev } from '../config/client';

import app from './app';
import App from './views/app';
import ErrorBoundary from './components/error-boundary';

/**
 * Register the service worker.
 */
async function registerServiceWorker() {
  try {
    const worker = await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });

    console.log('Service Worker registered successfully');

    // Try updating the service worker after reconnecting
    // We need this because we might have pushed a new version
    app.store.on('state.change', async (prevState, newState) => {
      if (newState.connected === true && prevState.connected === false) {
        await worker.update();
      }
    });

    worker.onupdatefound = async () => {
      console.log('Update found for service worker');

      await worker.update();

      const installingWorker = worker.installing;

      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'activated') {
          window.location.reload(true);
        }
      };
    };
  } catch (error) {
    console.log('Service Worker registration failed:', error);
  }
}

if ('serviceWorker' in navigator && !isDev) {
  registerServiceWorker();
}

ReactDOM.render((
  <ErrorBoundary isTopLevel>
    <App />
  </ErrorBoundary>
), document.getElementById('app'));
