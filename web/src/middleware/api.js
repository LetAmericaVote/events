import {
  API_REQUEST_INITIATED,
  apiRequestFailed,
  apiRequestSucceeded,
  setApiActionMetaEndpoint,
} from '../actions';

const routing = store => next => action => {
  if (action.type === API_REQUEST_INITIATED) {
    const { endpoint, options, metaAction } = action;

    if (selectApiRequestIsPending(endpoint, store.getState())) {
      return next(action);
    }

    store.dispatch(setApiActionMetaEndpoint(metaAction, endpoint));

    fetch(endpoint, options)
      .then(async res => {
        const json = await res.json();

        if (! json) {
          store.dispatch(apiRequestFailed(endpoint, 'Api request returned no data.'));
          return;
        }

        if (res.status !== 200 || json.error) {
          store.dispatch(apiRequestFailed(endpoint, json.message || 'Api request failed.'));
          return;
        }

        store.dispatch(apiRequestSucceeded(endpoint, json));
      })
      .catch(error => {
        console.error(error);
        store.dispatch(apiRequestFailed(endpoint, 'Api request failed, possibly due to network failure.'));
      });
  }

  return next(action);
};

export default routing;
