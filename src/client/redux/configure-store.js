import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

export default function configureStore() {
  const that = this;
  const history = createBrowserHistory();
  const middleware = routerMiddleware(history);

  that.store = createStore(reducers, composeWithDevTools(applyMiddleware(middleware)));
  that.history = history;
}
