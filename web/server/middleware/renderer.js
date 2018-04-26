import React from 'react';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import fetch from 'node-fetch';
import UrlPattern from 'url-pattern';
import reducers from '../../src/reducers';
import theme from '../../src/theme';
import App from '../../src/App';
import {
  storeEvent,
  setPathname,
} from '../../src/actions';
import {
  EVENT_ROUTE,
  EVENT_COMMENT_ROUTE,
} from '../../src/routing/routes';

const path = require('path');
const fs = require('fs');

export default async (req, res, next) => {
  try {
    const store = createStore(reducers);
    const sheet = new ServerStyleSheet();

    const requestPath = req.params['0'];
    const eventPageMatch = new UrlPattern(EVENT_ROUTE).match(requestPath) ||
      new UrlPattern(EVENT_COMMENT_ROUTE).match(requestPath);

    const { eventSlug } = eventPageMatch || {};

    if (eventSlug) {
      const endpoint = `${process.env.REACT_APP_ROWBOAT_API_URI}/v1/events/slug/${eventSlug}`;
      const eventResponse = await fetch(endpoint);
      const json = await eventResponse.json();

      if (json.error && eventResponse.status === 404) {
        store.dispatch(setPathname('/404'));
      } else {
        const { event } = json;
        store.dispatch(storeEvent(event));
      }
    }

    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
      if (err) {
        console.error(err);
        return res.status(500).send('We had an error. Hang tight.');
      }

      const html = ReactDOMServer.renderToString(sheet.collectStyles(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
      ));

      const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
      const styles = sheet.getStyleTags();

      const text = htmlData
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        .replace('window.__PRELOADED_STATE__={}', `window.__PRELOADED_STATE__ = ${preloadedState};`)
        .replace('<style type="ssr"></style>', `${styles}`);

      return res.send(text);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('We had an error. Hang tight.');
  }
};
