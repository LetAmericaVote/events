import { combineReducers } from 'redux';
import api from './api';
import events from './events';
import routing from './routing';

const reducers = combineReducers({
  api,
  events,
  routing,
});

export default reducers;
