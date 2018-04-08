export const FETCH_PAGINATED_USER_COMMENTS = 'FETCH_PAGINATED_USER_COMMENTS';

/**
 * Fetch a paginated list of the authenticated users comments.
 *
 * @param  {Boolean} sortByRecent Sort comments by post time
 */
export function fetchPaginatedUserComments(sortByRecent) {
  return { type: FETCH_PAGINATED_USER_COMMENTS, sortByRecent };
}

export const FETCH_PAGINATED_EVENT_COMMENTS = 'FETCH_PAGINATED_EVENT_COMMENTS';

/**
 * Fetch a paginated list of comments for an event.
 *
 * @param  {String} eventId Event id
 * @param  {String} inReplyTo Comment id
 */

/**
 * Fetch a paginated list of comments for an event.
 *
 * @param  {String} eventId       Event id
 * @param  {Boolean} sortByRecent Sort comments by post time
 * @param  {String} inReplyTo     Comment id
 */
export function fetchPaginatedEventComments(eventId, sortByRecent, inReplyTo) {
  return { type: FETCH_PAGINATED_EVENT_COMMENTS, eventId, sortByRecent, inReplyTo };
}

export const FETCH_COMMENT = 'FETCH_COMMENT';

/**
 * Fetch a comment by id.
 *
 * @param  {String} eventId   Event id of where the comment was posted
 * @param  {String} commentId Comment id
 */
export function fetchComment(eventId, commentId) {
  return { type: FETCH_COMMENT, eventId, commentId };
}

export const POST_COMMENT_TO_EVENT = 'POST_COMMENT_TO_EVENT';

/**
 * Post a comment to an event.
 *
 * @param  {String} eventId   Event id to post to.
 * @param  {String} message   Message to write
 * @param  {[type]} [inReplyTo=null] Optionally, reply to a specific comment.
 */
export function postCommentToEvent(eventId, message, inReplyTo = null) {
  return { type: POST_COMMENT_TO_EVENT, eventId, message, inReplyTo };
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
