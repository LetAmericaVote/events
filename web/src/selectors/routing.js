/**
 * Select the routing store.
 *
 * @param  {Object} state redux state
 * @return {Object}       routing store
 */
export const selectRouting = (state) => state.routing;

/**
 * Select the active route pathname.
 *
 * @param  {Object} state redux state
 * @return {String}       pathname
 */
export const selectRoutingPathname = (state) =>
  selectRouting(state).pathname;

/**
 * Select the history of previously visited routes.
 *
 * @param  {Object} state redux state
 * @return {Array}        history
 */
export const selectRoutingHistory = (state) =>
  selectRouting(state).history;

/**
 * Select the last visited path from the
 * store history.
 *
 * @param  {Object} state redux state
 * @return {String}       last visited path
 */
export const selectLastRouteVisited = (state) =>
  selectRoutingHistory(state)[0];
