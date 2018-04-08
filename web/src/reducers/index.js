import { combineReducers } from 'redux';
import api from './api';
import events from './events';
import routing from './routing';
import users from './users';

const reducers = combineReducers({
  api,
  events,
  routing,
  users,
});

export default reducers;
