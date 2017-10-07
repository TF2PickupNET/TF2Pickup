import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

/**
 * Setup the redux store and make it available from the app object.
 */
export default function configureStore() {
  const that = this;
  const history = createBrowserHistory();

  that.store = createStore(
    reducers(that),
    composeWithDevTools(applyMiddleware(routerMiddleware(history))),
  );
  that.history = history;
}
