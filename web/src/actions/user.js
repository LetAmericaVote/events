export const FETCH_USER_BY_ID = 'FETCH_USER_BY_ID';

/**
 * Fetch user by their ID.
 *
 * @param  {String} userId User id
 */
export function fetchUserById(userId) {
  return { type: FETCH_USER_BY_ID, userId };
}

export const FETCH_PAGINATED_USERS = 'FETCH_USERS';

/**
 * Fetch an array of paginated users.
 */
export function fetchPaginatedUsers() {
  return { type: FETCH_PAGINATED_USERS };
}

export const FETCH_RANDOM_USERS = 'FETCH_RANDOM_USERS';

/**
 * Fetch a random assortment of users.
 */
export function fetchRandomUsers() {
  return { type: FETCH_RANDOM_USERS };
}

export const UPDATE_AUTHENTICATED_USER = 'UPDATE_AUTHENTICATED_USER';

/**
 * Update the currently authenticated user with the given fields.
 *
 * @param  {Object} fields Key/value pairs to update
 */
export function updateAuthenticatedUser(fields) {
  return { type: UPDATE_AUTHENTICATED_USER, fields };
}

export const STORE_USER = 'STORE_USER';

/**
 * Store the user data to the redux store.
 *
 * @param  {Object} user User object
 */
export function storeUser(user) {
  return { type: STORE_USER, user };
}

export const STORE_USERS = 'STORE_USERS';

/**
 * Store an array of users to the redux store.
 *
 * @param  {Array<Object>} users
 */
export function storeUsers(users) {
  return { type: STORE_USERS, users };
}
