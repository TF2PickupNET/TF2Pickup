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
    await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });

    console.log('Service Worker registered successfully.');
  } catch (error) {
    console.log('Service Worker registration failed:', error);
  }
}

if ('serviceWorker' in navigator && !isDev) {
  registerServiceWorker();
}

ReactDOM.render(<App app={app} />, document.getElementById('app'));
