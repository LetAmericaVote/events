/**
 * Select the auth store.
 *
 * @param  {Object} state Redux state
 * @return {Object}       Auth store
 */
export const selectAuth = (state) => state.auth;

/**
 * Select if the client user is authenticated.
 *
 * @param  {Object} state Redux state
 * @return {Boolean}      True if authenticated
 */
export const selectIsAuthenticated = (state) =>
  !!selectAuth(state).userId &&
  !!selectAuth(state).token;

/**
 * Select the user id the currently authenticated user.
 *
 * @param  {Object} state Redux state
 * @return {String|null}  null if user is not authenticated
 */
export const selectAuthUserId = (state) =>
  selectIsAuthenticated(state) ?
    selectAuth(state).userId : null;

/**
 * Select the token of the currently authenticated user.
 *
 * @param  {Object} state Redux state
 * @return {String|null}  null if user is not authenticated
 */
export const selectAuthToken = (state) =>
  selectIsAuthenticated(state) ?
    selectAuth(state).token : null;
