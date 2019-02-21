import 'modern-normalize/modern-normalize.css';
import '@atlaskit/css-reset/dist/bundle.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-jss';

import Layout from './Layout';
import theme from './theme';
import Views from './Views';
import registerServiceWorker from './register-service-worker';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Views />
      </Layout>
    </ThemeProvider>
  );
}

const appContainer = document.querySelector('#app');

if (appContainer) {
  ReactDOM.render((
    <App />
  ), appContainer);
}

registerServiceWorker();
