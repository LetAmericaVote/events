import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';
import App from './App';
import makeStore from './store';
import routerSync from './routing/sync';

const store = makeStore();
routerSync(store);

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
  }
`;

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
