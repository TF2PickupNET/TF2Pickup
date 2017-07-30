import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';

import { isDev } from '../config';
import reducers from './reducers';

/**
 * Setup the redux store and make it available from the app object.
 */
export default function configureStore() {
  const that = this;
  const history = createBrowserHistory();
  const middleware = isDev
    ? composeWithDevTools(applyMiddleware(routerMiddleware(history)))
    : applyMiddleware(routerMiddleware(history));

  that.store = createStore(reducers(that), middleware);
  that.history = history;
}
