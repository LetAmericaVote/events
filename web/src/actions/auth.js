export const STORE_AUTH_CREDENTIALS = 'STORE_AUTH_CREDENTIALS';

/**
 * Store the auth credentials for this client.
 *
 * @param {String} userId User id
 * @param {String} token  Api token
 */
export function storeAuthCredentials(userId, token) {
  return { type: STORE_AUTH_CREDENTIALS, userId, token };
}

export const POST_GOOGLE_ID_TOKEN = 'POST_GOOGLE_ID_TOKEN';

/**
 * Post a Google Id Token to claim a user + token resource.
 *
 * @param  {String} idToken Google ID Token
 */
export function postGoogleIdToken(idToken) {
  return { type: POST_GOOGLE_ID_TOKEN, idToken };
}
