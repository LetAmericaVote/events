import {
  API_REQUEST_INITIATED,
  apiRequestFailed,
  apiRequestSucceeded,
  setApiActionMetaEndpoint,
} from '../actions';
import {
  selectApiRequestIsPending,
  selectAuthUserId,
  selectAuthToken,
  selectIsAuthenticated,
} from '../selectors';

const routing = store => next => action => {
  if (action.type === API_REQUEST_INITIATED) {
    const { endpoint, options, metaAction, space } = action;

    if (selectApiRequestIsPending(endpoint, store.getState())) {
      return next(action);
    }

    store.dispatch(setApiActionMetaEndpoint(metaAction, space, endpoint));

    const authUserId = selectAuthUserId(store.getState());
    const authToken = selectAuthToken(store.getState());
    const isAuthenticated = selectIsAuthenticated(store.getState());

    const requestOptions = { ...(options || {}) };

    if (isAuthenticated) {
      if (! requestOptions.headers) {
        requestOptions.headers = new Headers();
      }

      requestOptions.headers.append('lav_auth_id', authUserId);
      requestOptions.headers.append('lav_auth_token', authToken);
    }

    fetch(endpoint, requestOptions)
      .then(async res => {
        const json = await res.json();

        if (! json) {
          store.dispatch(apiRequestFailed(
            endpoint, 'Api request returned no data.', metaAction, space,
          ));
          return;
        }

        if (res.status !== 200 || json.error) {
          store.dispatch(apiRequestFailed(
            endpoint, json.message || 'Api request failed.', metaAction, space,
          ));
          return;
        }

        store.dispatch(apiRequestSucceeded(endpoint, json, metaAction, space));
      })
      .catch(error => {
        console.error(error);
        store.dispatch(apiRequestFailed(
          endpoint, 'Api request failed, possibly due to network failure.', metaAction, space,
        ));
      });
  }

  return next(action);
};

export default routing;
