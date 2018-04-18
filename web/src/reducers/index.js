import { combineReducers } from 'redux';
import api from './api';
import auth from './auth';
import comments from './comments';
import events from './events';
import forms from './forms';
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
  comments,
  events,
  forms,
  hostLink,
  location,
  modal,
  routing,
  search,
  signups,
  users,
});

export default reducers;
