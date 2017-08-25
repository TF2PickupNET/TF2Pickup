import 'normalize.css';
import 'mdi/css/materialdesignicons.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import app from './app';
import App from './views/app';
import { isDev } from './config';

if ('serviceWorker' in navigator && !isDev) {
  navigator.serviceWorker
    .register('/service-worker.js', { scope: '/' })
    .then(() => console.log('Service Worker registered successfully.'))
    .catch(error => console.log('Service Worker registration failed:', error));
}

ReactDOM.render(<App app={app} />, document.getElementById('app'));
