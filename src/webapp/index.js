// @flow

import 'normalize.css';
import 'antd/dist/antd.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';

import store from './store';
import BasicLayout from './layouts/BasicLayout';
import registerServiceWorker from './register-service-worker';
import MainLayout from './layouts/MainLayout';
import Views from './views';
import SteamLogin from './views/SteamLogin';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route
            exact
            strict
            path="/login/steam"
            component={SteamLogin}
          />

          <BasicLayout>
            <MainLayout>
              <Views />
            </MainLayout>
          </BasicLayout>
        </div>
      </BrowserRouter>
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
