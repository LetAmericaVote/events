import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render((
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
), document.getElementById('root'));
