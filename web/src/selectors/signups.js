import { selectAuthUserId } from './auth';
import { selectUser } from './users';
import { selectEvent } from './events';

/**
 * Select signup items from the store.
 *
 * @param  {Object} state redux state
 * @return {Object}       Signup store
 */
export const selectSignups = (state) => state.signups.items;

/**
 * Select if the signup exists in the store.
 *
 * @param  {String} signupId Signup id
 * @param  {Object} state    Redux state
 * @return {Boolean}         True if exists
 */
export const selectSignupExists = (signupId, state) =>
  !!selectSignups(state)[signupId];

/**
 * Select a signup from the store.
 *
 * @param  {String} signupId Signup id
 * @param  {Object} state    Redux state
 * @return {Object|null}     Null if signup doesn't exist
 */
export const selectSignup = (signupId, state) =>
  selectSignupExists(signupId, state) ? ({
    ...selectSignups(state)[signupId],
    user: selectUser(selectSignups(state)[signupId].user) ||
      selectSignups(state)[signupId].user || null,
    event: selectEvent(selectSignups(state)[signupId].event) ||
      selectSignups(state)[signupId].event || null,
  }) : null;

/**
 * Select all signups in the store for the given event id.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state   Redux state
 * @return {Array}          List of signups
 */
export const selectSignupsForEvent = (eventId, state) =>
  Object.keys(selectSignups(state))
    .filter(signupId => selectSignups(state)[signupId].event === eventId)
    .map(signupId => selectSignup(signupId, state));

/**
 * Select all signups in the store for the given event id
 * sorted by signup creation time.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state   Redux state
 * @return {Array}          Sorted list of signups
 */
export const selectSignupsForEventSortedByCreatedAt = (eventId, state) =>
  selectSignupsForEvent(eventId, state).sort((signupA, signupB) => (
    new Date(signupB.createdAt).getTime() -
    new Date(signupA.createdAt).getTime()
  ));

/**
 * Select all signups in the store for the given user id.
 *
 * @param  {String} userId User id
 * @param  {Object} state  Redux state
 * @return {Array}         List of signups
 */
export const selectSignupsForUser = (userId, state) =>
  Object.keys(selectSignups(state))
    .filter(signupId => selectSignups(state)[signupId].user === userId)
    .map(signupId => selectSignup(signupId, state));

/**
 * Select all signups in the store for the given user id
 * sorted by the event dateTime.
 *
 * @param  {String} userId User id
 * @param  {Object} state  Redux state
 * @return {Array}         Sorted list of signups
 */
export const selectSignupsForUserSortedByUpcoming = (userId, state) =>
  selectSignupsForUser(userId, state).sort((signupA, signupB) => {
    if (! signupA.event || ! signupA.event.dateTime) {
      return 1;
    }

    if (! signupB.event || ! signupB.event.dateTime) {
      return -1;
    }

    const timeA = new Date(signupA.event.dateTime).getTime();
    const timeB = new Date(signupB.event.dateTime).getTime();

    return timeB - timeA;
  });

/**
 * Select all signups for the authenticated user.
 *
 * @param  {Object} state Redux state
 * @return {Array}        List of signups
 */
export const selectSignupsForAuthenticatedUser = (state) =>
  selectSignupsForUser(selectAuthUserId(state), state);

/**
 * Select all signups for the authenticated user sorted by
 * the event dateTime.
 *
 * @param  {Object} state Redux state
 * @return {Array}        List of signups
 */
export const selectSignupsForAuthenticatedUserSortedByUpcoming = (state) =>
  selectSignupsForUserSortedByUpcoming(selectAuthUserId(state), state);
