import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App from './App';
import makeStore from './store';
import routerSync from './routing/sync';
import theme from './theme';

import './index.css';

const store = makeStore();
routerSync(store);

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
  debug: process.env.NODE_ENV === `development`,
});

ReactDOM.render((
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
), document.getElementById('root'));
