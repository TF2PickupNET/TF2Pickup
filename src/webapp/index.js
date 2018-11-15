// @flow

import 'modern-normalize/modern-normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import BasicLayout from './layouts/BasicLayout';
import registerServiceWorker from './register-service-worker';
import MainLayout from './layouts/MainLayout';
import Views from './views';

function App() {
  return (
    <BrowserRouter>
      <BasicLayout>
        <MainLayout>
          <Views />
        </MainLayout>
      </BasicLayout>
    </BrowserRouter>
  );
}

const appContainer = document.getElementById('app');

if (appContainer) {
  ReactDOM.render((
    <App />
  ), appContainer);
}

registerServiceWorker();
