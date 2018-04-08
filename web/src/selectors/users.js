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
 * Select the users first name.
 *
 * @param  {String} userId User id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectUserFirstName = (userId, state) =>
  selectUserExists(userId, state) ?
    selectUser(userId).firstName : null;

/**
 * Select the users full name.
 *
 * @param  {String} userId User id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectUserFullName = (userId, state) =>
  selectUserExists(userId, state) ?
    selectUser(userId).fullName : null;

/**
 * Select the users last name.
 *
 * @param  {String} userId User id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectUserLastName = (userId, state) =>
  selectUserExists(userId, state) ?
    selectUser(userId).lastName : null;

/**
 * Select the users profile photo.
 *
 * @param  {String} userId User id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectUserProfilePhoto = (userId, state) =>
  selectUserExists(userId, state) ?
    selectUser(userId).profilePhoto : null;

/**
 * Select the users role.
 *
 * @param  {String} userId User id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if user is false-y
 */
export const selectUserRole = (userId, state) =>
  selectUserExists(userId, state) ?
    selectUser(userId).role : null;

// TODO: nAuthenticatedUser variants
/*
export const selectAuthenticatedUserRole = (state) =>
  selectIsAuthenticated(state) ?
    selectUserRole(selectAuthenticatedUserId(state), state) : null;
 */
