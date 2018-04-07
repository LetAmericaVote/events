import qs from 'qs';

const ROWBOAT_API_URI = process.env.REACT_APP_ROWBOAT_API_URI;

export const WIPE_API_REQUEST = 'WIPE_API_REQUEST';

/**
 * Wipe the api request from the store.
 *
 * @param  {String} endpoint API endpoint that was hit.
 */
export function wipeApiRequest(endpoint) {
  return { type: WIPE_API_REQUEST };
}

export const API_REQUEST_FAILED = 'API_REQUEST_FAILED';

/**
 * Mark the status of this api request to 'failed'
 * and save the error.
 *
 * @param  {String} endpoint API endpoint in reference too
 * @param  {Mixed} error     Error response from request
 */
export function apiRequestFailed(endpoint, error) {
  return { type: API_REQUEST_FAILED, endpoint, error };
}

export const API_REQUEST_SUCCEEDED = 'API_REQUEST_SUCCEEDED';

/**
 * Mark the status of this api request to 'succeeded'
 * and save the data.
 *
 * @param  {String} endpoint API endpoint in reference too
 * @param  {Mixed} data      Data returned by API
 */
export function apiRequestSucceeded(endpoint, data) {
  return { type: API_REQUEST_SUCCEEDED, endpoint, data };
}

export const API_REQUEST_INITIATED = 'API_REQUEST_INITIATED';

/**
 * Initiate an api request.
 *
 * @param  {String} metaAction Action name
 * @param  {String} endpoint Valid url to fetch against.
 * @param  {Object} options Fetch options
 */
export function initiateApiRequest(metaAction, endpoint, options = {}) {
  return { type: API_REQUEST_INITIATED, metaAction, endpoint, options };
}

/**
 * Get data from the rowboat api.
 *
 * @param  {String} metaAction Action name
 * @param  {String} path Resource to fetch from the API.
 */
export function getFromApi(metaAction, path, query) {
  const queryString = query ? `?${qs.stringify(query)}` : '';
  return initiateApiRequest(metaAction, `${ROWBOAT_API_URI}${path}${queryString}`);
}

/**
 * Post data to the given resource on the rowboat api.
 *
 * @param  {String} metaAction Action name
 * @param  {String} path Resource to push to.
 * @param  {Object} data Data to attach as the request payload.
 */
export function postToApi(metaAction, path, data) {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  return initiateApiRequest(metaAction, `${ROWBOAT_API_URI}${path}`, options);
}


/**
 * Put data to the given resource on the rowboat api.
 *
 * @param  {String} metaAction Action name
 * @param  {String} path Resource on the api to put to.
 * @param  {Object} data Data to attach as the request payload.
 */
export function putToApi(metaAction, path, data) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  return initiateApiRequest(metaAction, `${ROWBOAT_API_URI}${path}`, options);
}

export const SET_API_ACTION_META_PROPERTY = 'SET_API_ACTION_META_PROPERTY';

/**
 * Set a meta value for the given api action.
 *
 * @param {String} metaAction Action name
 * @param {String} property Property name
 * @param {Mixed} value Meta value
 */
export function setApiActionMetaProperty(metaAction, property, value) {
  return { type: SET_API_ACTION_META_PROPERTY, metaAction, property, value };
}

export const SET_API_ACTION_META_ENDPOINT = 'SET_API_ACTION_META_ENDPOINT';

/**
 * Set the endpoint for the given api action meta.
 *
 * @param {String} metaAction Action name
 * @param {String} endpoint Api endpoint
 */
export function setApiActionMetaEndpoint(metaAction, endpoint) {
  return { type: SET_API_ACTION_META_ENDPOINT, metaAction, endpoint };
}
