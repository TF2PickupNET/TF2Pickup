import 'babel-polyfill';
import 'normalize.css';
import 'mdi/css/materialdesignicons.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import app from './app';
import App from './views/app';

ReactDOM.render(
  <Provider store={app.store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
