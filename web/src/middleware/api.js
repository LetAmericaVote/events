import {
  API_REQUEST_INITIATED,
  apiRequestFailed, apiRequestSucceeded,
} from '../actions';

const routing = store => next => action => {
  if (action.type === API_REQUEST_INITIATED) {
    // ... makeFetchRequest with options
    // ... ... dispatch failed/succeeded action
  }

  return next(action);
};

export default routing;
