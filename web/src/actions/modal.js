export const OPEN_MODAL = 'OPEN_MODAL';

/**
 * Open the given modal.
 *
 * @param  {String} modalType Modal type
 * @param  {Mixed}  props     Props to attach to the modal
 */
export function openModal(modalType, props) {
  return { type: OPEN_MODAL, modalType, props };
}

export const OPEN_SIGNUP_MODAL = 'OPEN_SIGNUP_MODAL';

/**
 * Open the signup modal.
 *
 * @param  {String} eventId       Event id
 * @param  {Number} [stepIndex=1] Modal page index
 */
export function openSignupModal(eventId, stepIndex = 1) {
  return openModal(OPEN_SIGNUP_MODAL, { eventId, stepIndex });
}

export const OPEN_COMMENT_MODAL = 'OPEN_COMMENT_MODAL';

/**
 * Open a comment modal.
 *
 * @param  {String} commentId Comment id
 * @param  {String} [eventSlug=null] Event slug
 */
export function openCommentModal(commentId, eventSlug = null) {
  return openModal(OPEN_COMMENT_MODAL, { commentId, eventSlug });
}

export const CLOSE_MODAL = 'CLOSE_MODAL';

/**
 * Close the modal.
 */
export function closeModal() {
  return { type: CLOSE_MODAL };
}
