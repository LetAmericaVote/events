import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, injectGlobal } from 'styled-components';
import App from './App';
import makeStore from './store';
import routerSync from './routing/sync';
import theme from './theme';

const store = makeStore();
routerSync(store);

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
  }
`;

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
