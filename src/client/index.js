import 'babel-polyfill';
import 'normalize.css';
import 'web-animations-js';
import 'mdi/css/materialdesignicons.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import whyDidYouUpdate from 'why-did-you-update';

import app from './app';
import App from './components/app';

whyDidYouUpdate(React, { exclude: /^(Connect|Route|ConntectedRouter|Switch|Helmet)/ });

ReactDOM.render(
  <Provider store={app.store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
