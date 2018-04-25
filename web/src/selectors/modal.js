import {
  OPEN_SIGNUP_MODAL,
  OPEN_COMMENT_MODAL,
} from '../actions';

/**
 * Select the modal store.
 *
 * @param  {Object} state Redux state
 * @return {Object}       Modal store
 */
export const selectModal = (state) => state.modal;

/**
 * Select if the modal is currently open.
 *
 * @param  {Object} state Redux state
 * @return {Boolean}      True if open
 */
export const selectIsModalOpen = (state) => selectModal(state).isOpen;

/**
 * Select the current modal type.
 *
 * @param  {Object} state Redux state
 * @return {String|null}  String if modal open, null otherwise
 */
export const selectModalType = (state) => selectModal(state).type;

/**
 * Select if the signup modal is open.
 *
 * @param  {Object} state Redux state
 * @return {Boolean}      True if open
 */
export const selectIsSignupModalOpen = (state) =>
  selectModalType(state) === OPEN_SIGNUP_MODAL;

/**
 * Select if the comment modal is open.
 *
 * @param  {Object} state Redux state
 * @return {Boolean}      True if open
 */
export const selectIsCommentModalOpen = (state) =>
  selectModalType(state) === OPEN_COMMENT_MODAL;

/**
 * Select any props attachecd to the modal.
 *
 * @param  {Object} state Redux state
 * @return {Mixed}
 */
export const selectModalProps = (state) => selectModal(state).props;
