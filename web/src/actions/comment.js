export const FETCH_PAGINATED_COMMENTS = 'FETCH_PAGINATED_COMMENTS';

/**
 * Fetch a paginated list of comments.
 *
 * @param  {Integer|null} [sortByPosted=null] Sort direction (+/- 1) or `null` for not sort.
 * @param  {String|null}  [eventId=null] Event id to search for or null
 * @param  {String|null} [userId=null] User id to search for or null
 * @param  {String|null} [inReplyTo=null] Comment id of parent. 'top' for top-level comments only.
 * @param  {Int|null} [limit=null] Limit the comments fetched to a specified amount
 */
export function fetchPaginatedComments(sortByPosted = null, eventId = null, userId = null, inReplyTo = null, limit = null) {
  return { type: FETCH_PAGINATED_COMMENTS, sortByPosted, eventId, userId, inReplyTo, limit };
}

export const FETCH_COMMENT = 'FETCH_COMMENT';

/**
 * Fetch a comment by id.
 *
 * @param  {String} commentId Comment id
 */
export function fetchComment(commentId) {
  return { type: FETCH_COMMENT, commentId };
}

export const POST_COMMENT = 'POST_COMMENT';

/**
 * Post a comment.
 *
 * @param  {String} message          Comment content
 * @param  {String} [eventId=null]   Optional event id
 * @param  {String} [inReplyTo=null] Optional comment reply id
 */
export function postComment(message, eventId = null, inReplyTo = null) {
  return { type: POST_COMMENT, message, eventId, inReplyTo };
}

export const UPDATE_COMMENT = 'UPDATE_COMMENT';

/**
 * Update a comment by id with a new message.
 *
 * @param  {String} commentId Comment id
 * @param  {String} message   New comment content
 */
export function updateComment(commentId, message) {
  return { type: UPDATE_COMMENT, commentId, message };
}

export const DELETE_COMMENT = 'DELETE_COMMENT';

/**
 * Delete a comment.
 *
 * @param  {String} commentId Comment id
 */
export function deleteComment(commentId) {
  return { type: DELETE_COMMENT, commentId };
}

export const STORE_COMMENT = 'STORE_COMMENT';

/**
 * Store a comment to the store.
 * @param  {Object} comment Comment
 */
export function storeComment(comment) {
  return { type: STORE_COMMENT, comment };
}

export const STORE_COMMENTS = 'STORE_COMMENTS';

/**
 * Store a list of comments to the store.
 *
 * @param  {Array<Object>} comments  List of comments
 */
export function storeComments(comments) {
  return { type: STORE_COMMENTS, comments };
}
