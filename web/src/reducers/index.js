import { combineReducers } from 'redux';
import api from './api';
import routing from './routing';

const reducers = combineReducers({
  api,
  routing,
});

export default reducers;
