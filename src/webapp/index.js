// @flow

import 'normalize.css';
import 'antd/dist/antd.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import store, { StoreContext } from './store';
import BasicLayout from './layouts/BasicLayout';
import registerServiceWorker from './register-service-worker';
import MainLayout from './layouts/MainLayout';
import Views from './views';

function App() {
  return (
    <StoreContext.Provider value={store}>
      <BrowserRouter>
        <BasicLayout>
          <MainLayout>
            <Views />
          </MainLayout>
        </BasicLayout>
      </BrowserRouter>
    </StoreContext.Provider>
  );
}

const appContainer = document.getElementById('app');

if (appContainer) {
  ReactDOM.render((
    <App />
  ), appContainer);
}

registerServiceWorker();
