import 'modern-normalize/modern-normalize.css';
import '@atlaskit/css-reset/dist/bundle.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';

import BasicLayout from './layouts/BasicLayout';
import registerServiceWorker from './register-service-worker';
import MainLayout from './layouts/MainLayout';
import theme from './theme';
import Views from './Views';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <BasicLayout>
          <MainLayout>
            <Views />
          </MainLayout>
        </BasicLayout>
      </ThemeProvider>
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
