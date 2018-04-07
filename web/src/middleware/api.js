import {
  selectApiRequestIsPending,
} from '../selectors';
import {
  API_REQUEST_INITIATED,
  apiRequestFailed,
  apiRequestSucceeded,
} from '../actions';

const api = store => next => action => {
  if (action.type === API_REQUEST_INITIATED) {
    const { endpoint, options } = action;

    if (selectApiRequestIsPending(endpoint, store.getState())) {
      return next(action);
    }

    fetch(endpoint, options)
      .then(res => {
        const json = await res.json();

        if (! json || ! json.body) {
          store.dispatch(apiRequestFailed(endpoint, 'Api request returned no data.'));
          return;
        }

        const { body } = json;

        if (res.status !== 200 || body.error) {
          store.dispatch(apiRequestFailed(endpoint, body.message || 'Api request failed.'));
          return;
        }

        store.dispatch(apiRequestSucceeded(endpoint, body));
      })
      .catch(error => {
        console.error(error);
        store.dispatch(apiRequestFailed(endpoint, 'Api request failed due to network failure.'));
      });
  }

  return next(action);
};

export default api;
