import { combineReducers } from 'redux';
import api from './api';
import auth from './auth';
import events from './events';
import routing from './routing';
import search from './search';
import signups from './signups';
import users from './users';

const reducers = combineReducers({
  api,
  auth,
  events,
  routing,
  search,
  signups,
  users,
});

export default reducers;
