/* eslint-disable no-console */

import 'normalize.css';
import 'mdi/css/materialdesignicons.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import whyDidYouUpdate from 'why-did-you-update';

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
    app.on('state.change', async (prevState, newState) => {
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

if (IS_DEV) {
  whyDidYouUpdate(React);
}

if ('serviceWorker' in navigator && !IS_DEV) {
  registerServiceWorker();
}

ReactDOM.render((
  <ErrorBoundary isTopLevel>
    <App />
  </ErrorBoundary>
), document.getElementById('app'));
