import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';

import reducers from '../reducers';
import appMiddleware from '../middleware';
import {
  storeAuthCredentials,
  STORE_AUTH_CREDENTIALS,
} from '../actions';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

export default function make() {
  const middlewares = [thunk, ...appMiddleware];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, preloadedState, composeEnhancers(applyMiddleware(...middlewares)));

  const sessionAuth = sessionStorage.getItem(STORE_AUTH_CREDENTIALS);
  if (sessionAuth) {
    const { userId, token } = JSON.parse(sessionAuth);
    store.dispatch(storeAuthCredentials(userId, token));
  }

  return store;
}
