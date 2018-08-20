// @flow

import 'normalize.css';
import 'antd/dist/antd.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import BasicLayout from './layouts/BasicLayout';
import registerServiceWorker from './register-service-worker';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Provider store={store}>
      <BasicLayout>
        <MainLayout>
          Test
        </MainLayout>
      </BasicLayout>
    </Provider>
  );
}

const appContainer = document.getElementById('app');

if (appContainer) {
  ReactDOM.render((
    <App />
  ), appContainer);
}

registerServiceWorker();
