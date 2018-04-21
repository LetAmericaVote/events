import {
  selectIsAuthenticated,
  selectAuthUserId
} from './auth';

/**
 * Select user items from the store.
 *
 * @param  {Object} state Redux state
 * @return {Object}       User items
 */
export const selectUsers = (state) => state.users.items;

/**
 * Select if the user exists in the store.
 *
 * @param  {String} userId User id
 * @param  {Object} state  Redux state
 * @return {Boolean}       True if exists
 */
export const selectUserExists = (userId, state) =>
  !!selectUsers(state)[userId];

/**
 * Select a user from the store.
 *
 * @param  {String} userId User id
 * @param  {Object} state Redux state
 * @return {Object|null}  Null if false-y
 */
export const selectUser = (userId, state) =>
  selectUsers(state)[userId] || null;

/**
 * Select the users in the store as an array.
 *
 * @param  {Object} state Redux state
 * @return {Array<Object>} Array of users
 */
export const selectUsersAsArray = (state) =>
  Object.keys(selectUsers(state))
    .map(userId => selectUser(userId, state));

/**
 * Select the users first name.
 *
 * @param  {String} userId User id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectUserFirstName = (userId, state) =>
  selectUserExists(userId, state) ?
    selectUser(userId, state).firstName : null;

/**
 * Select the users full name.
 *
 * @param  {String} userId User id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectUserFullName = (userId, state) =>
  selectUserExists(userId, state) ?
    selectUser(userId, state).fullName : null;

/**
 * Select the users last name.
 *
 * @param  {String} userId User id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectUserLastName = (userId, state) =>
  selectUserExists(userId, state) ?
    selectUser(userId, state).lastName : null;

/**
 * Select the users profile photo.
 *
 * @param  {String} userId User id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectUserProfilePhoto = (userId, state) =>
  selectUserExists(userId, state) ?
    selectUser(userId, state).profilePhoto : null;

/**
 * Select the users role.
 *
 * @param  {String} userId User id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectUserRole = (userId, state) =>
  selectUserExists(userId, state) ?
    selectUser(userId, state).role : null;

/**
 * Select the currently authenticated user.
 *
 * @param  {Object} state Redux state
 * @return {Object|null}  Null if user is not authenticated or not stored
 */
export const selectAuthenticatedUser = (state) =>
  selectIsAuthenticated(state) &&
  selectUserExists(selectAuthUserId(state), state) ?
    selectUser(selectAuthUserId(state), state) : null;

/**
 * Select the authenticated users first name.
 *
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectAuthenticatedUserFirstName = (state) =>
  selectUserExists(selectAuthUserId(state), state) &&
  selectIsAuthenticated(state) ?
    selectUser(selectAuthUserId(state), state).firstName : null;

/**
 * Select the authenticated users full name.
 *
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectAuthenticatedUserFullName = (state) =>
  selectUserExists(selectAuthUserId(state), state) &&
  selectIsAuthenticated(state) ?
    selectUser(selectAuthUserId(state), state).fullName : null;

/**
 * Select the authenticated users last name.
 *
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectAuthenticatedUserLastName = (state) =>
  selectUserExists(selectAuthUserId(state), state) &&
  selectIsAuthenticated(state) ?
    selectUser(selectAuthUserId(state), state).lastName : null;

/**
 * Select the authenticated users profile photo.
 *
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectAuthenticatedUserProfilePhoto = (state) =>
  selectUserExists(selectAuthUserId(state), state) &&
  selectIsAuthenticated(state) ?
    selectUser(selectAuthUserId(state), state).profilePhoto : null;

/**
 * Select the authenticated users role.
 *
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectAuthenticatedUserRole = (state) =>
  selectUserExists(selectAuthUserId(state), state) &&
  selectIsAuthenticated(state) ?
    selectUser(selectAuthUserId(state), state).role : null;

/**
 * Select the authenticated users mobile.
 *
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectAuthenticatedUserMobile = (state) =>
  selectUserExists(selectAuthUserId(state), state) &&
  selectIsAuthenticated(state) ?
    selectUser(selectAuthUserId(state), state).mobile : null;

/**
 * Select the authenticated users zipcide.
 *
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectAuthenticatedUserZipcode = (state) =>
  selectUserExists(selectAuthUserId(state), state) &&
  selectIsAuthenticated(state) ?
    selectUser(selectAuthUserId(state), state).zipcode : null;
