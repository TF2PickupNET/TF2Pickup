import 'normalize.css';
import 'mdi/css/materialdesignicons.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import app from './app';
import App from './views/app';

ReactDOM.render(<App app={app} />, document.getElementById('app'));
