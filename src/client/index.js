/* eslint-disable no-console */

import 'normalize.css';
import 'mdi/css/materialdesignicons.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { isDev } from '../config/client';

import app from './app';
import App from './views/app';

/**
 * Register the service worker.
 */
async function registerServiceWorker() {
  try {
    const worker = await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });

    worker.onupdatefound = () => {
      console.log('Update found for service worker');

      // The updatefound event implies that reg.installing is set; see
      // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
      const installingWorker = worker.installing;

      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // At this point, the old content will have been purged and the fresh content will
          // have been added to the cache.
          window.location.reload();
        }
      };
    };

    console.log('Service Worker registered successfully.');
  } catch (error) {
    console.log('Service Worker registration failed:', error);
  }
}

if ('serviceWorker' in navigator && !isDev) {
  registerServiceWorker();
}

ReactDOM.render(<App app={app} />, document.getElementById('app'));
