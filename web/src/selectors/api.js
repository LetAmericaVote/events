/**
 * Select an api request from the store.
 *
 * @param  {String} endpoint The endpoint of the request to retrieve
 * @param  {Object} state    Redux state
 * @return {Object|null}     Request if found, null otherwise
 */
export const selectApiRequest = (endpoint, state) => state.api.requests[endpoint] || null;

/**
 * Select if the request is currently pending.
 *
 * @param  {String} endpoint The endpoint of the request to retrieve
 * @param  {Object} state    Redux state
 * @return {Boolean}         True if pending
 */
export const selectApiRequestIsPending = (endpoint, state) =>
  !!selectApiRequest(endpoint, state) &&
  selectApiRequest(endpoint, state).isPending;

/**
 * Select if the request has been a success.
 *
 * @param  {String} endpoint The endpoint of the request to retrieve
 * @param  {Object} state    Redux state
 * @return {Boolean}         True if success
 */
export const selectApiRequestIsSuccess = (endpoint, state) =>
  !!selectApiRequest(endpoint, state) &&
  selectApiRequest(endpoint, state).isSuccess;

/**
 * Select if the request has failed.
 *
 * @param  {String} endpoint The endpoint of the request to retrieve
 * @param  {Object} state    Redux state
 * @return {Boolean}         True if failure
 */
export const selectApiRequestHasFailed = (endpoint, state) =>
  !!selectApiRequest(endpoint, state) &&
  selectApiRequest(endpoint, state).hasFailed;

/**
 * Select if the request returned data.
 *
 * @param  {String} endpoint The endpoint of the request to retrieve
 * @param  {Object} state    Redux state
 * @return {Boolean}         True if returned data
 */
export const selectApiRequestHasData = (endpoint, state) =>
  !!selectApiRequest(endpoint, state) &&
  !!selectApiRequest(endpoint, state).data;

/**
 * Select the data returned by the request.
 *
 * @param  {String} endpoint The endpoint of the request to retrieve
 * @param  {Object} state    Redux state
 * @return {Mixed|null}      Null if the data is false-y
 */
export const selectApiRequestData = (endpoint, state) =>
  !!selectApiRequest(endpoint, state) ?
  selectApiRequest(endpoint, state).data : null;

/**
 * Select if the request returned an error.
 *
 * @param  {String} endpoint The endpoint of the request to retrieve
 * @param  {Object} state    Redux state
 * @return {Boolean}         True if returned error
 */
export const selectApiRequestHasError = (endpoint, state) =>
  !!selectApiRequest(endpoint, state) &&
  !!selectApiRequest(endpoint, state).error;

/**
 * Select the error returned by the request.
 *
 * @param  {String} endpoint The endpoint of the request to retrieve
 * @param  {Object} state    Redux state
 * @return {Mixed|null}      Null if the error is false-y
 */
export const selectApiRequestError = (endpoint, state) =>
  !!selectApiRequest(endpoint, state) ?
  selectApiRequest(endpoint, state).error : null;

/**
 * Select metadata about a request action.
 *
 * @param  {String} metaAction Action name
 * @param  {Object} state Redux state
 * @return {Mixed|null} Meta if found, null otherwise
 */
export const selectApiMeta = (metaAction, state) => state.api.meta[metaAction] || null;

/**
 * Select the endpoint of the metadata for the given action.
 *
 * @param  {String} metaAction Action name
 * @param  {Object} state Redux state
 * @return {Mixed|null} Null if the meta or endpoint is false-y
 */
export const selectApiMetaEndpoint = (metaAction, state) =>
  !!selectApiMeta(metaAction, state) ?
  selectApiMeta(metaAction, state).endpoint || null : null;

/**
 * Select a custom meta property of the metadatas for the given action.
 *
 * @param  {String} metaAction Action name
 * @param  {String} property Custom meta property name
 * @param  {Object} state Redux state
 * @return {Mixed|null} Null if the meta or property value is false-y
 */
export const selectApiMetaCustomProperty = (metaAction, property, state) =>
  !!selectApiMeta(metaAction, state) &&
  !!selectApiMeta(metaAction, state).custom ?
    selectApiMeta(metaAction, state).custom[property] || null : null;

/**
 * Select the meta action name for the given endpoint.
 *
 * @param  {String} endpoint Endpoint to search for
 * @param  {String} property Custom meta property name
 * @return {String|null} Null if meta action name can't be found
 */
export const selectActionMetaNameForEndpoint = (endpoint, state) =>
  Object.keys(state.api.meta).find((metaAction) =>
    selectApiMetaEndpoint(metaAction, state) === endpoint) || null;
