import { combineReducers } from 'redux';
import api from './api';
import auth from './auth';
import events from './events';
import hostLink from './hostLink';
import location from './location';
import modal from './modal';
import routing from './routing';
import search from './search';
import signups from './signups';
import users from './users';

const reducers = combineReducers({
  api,
  auth,
  events,
  hostLink,
  location,
  modal,
  routing,
  search,
  signups,
  users,
});

export default reducers;
