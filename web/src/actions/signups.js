import ReactGA from 'react-ga';

export const FETCH_PAGINATED_USER_SIGNUPS = 'FETCH_PAGINATED_USER_SIGNUPS';

/**
 * Fetch a paginated list of the authenticated users signups.
 *
 * @param  {Boolean} [automaticAdvance=false] Automatically advance through the resource
 */
export function fetchPaginatedUserSignups(automaticAdvance = false) {
  return { type: FETCH_PAGINATED_USER_SIGNUPS, automaticAdvance };
}

export const FETCH_USER_SIGNUP_STATUS = 'FETCH_USER_SIGNUP_STATUS';

/**
 * Fetch the user signup status for the given event id.
 *
 * @param  {String} eventId Event id to fetch a signup for
 */
export function fetchUserSignupStatus(eventId) {
  return { type: FETCH_USER_SIGNUP_STATUS, eventId };
}

export const FETCH_PAGINATED_EVENT_SIGNUPS = 'FETCH_PAGINATED_EVENT_SIGNUPS';

/**
 * Fetch a paginated list of event signups.
 *
 * @param  {String} eventId            Event id to paginate for
 * @param  {Boolean} sortyBySignupDate Sort signups by when they were created
 * @param  {Boolean} [automaticAdvance=false] Automatically advance through the resource
 */
export function fetchPaginatedEventSignups(eventId, sortBySignupDate, automaticAdvance = false) {
  return { type: FETCH_PAGINATED_EVENT_SIGNUPS, eventId, sortBySignupDate, automaticAdvance };
}

export const SIGNUP_FOR_EVENT = 'SIGNUP_FOR_EVENT';

/**
 * Sign the authenticated user up for an event.
 *
 * @param  {String} eventId Event id to signup for
 */
export function signupForEvent(eventId) {
  ReactGA.event({
    category: 'Signup',
    action: 'User signed up for an event',
    label: eventId,
  });

  return { type: SIGNUP_FOR_EVENT, eventId };
}

export const STORE_SIGNUP = 'STORE_SIGNUP';

/**
 * Store a signup to the redux store.
 *
 * @param  {Object} signup Signup data
 */
export function storeSignup(signup) {
  return { type: STORE_SIGNUP, signup };
}

export const STORE_SIGNUPS = 'STORE_SIGNUPS';

/**
 * Store an array of signups to the redux store.
 *
 * @param  {Array<Object>} signups Array of signups
 */
export function storeSignups(signups) {
  return { type: STORE_SIGNUPS, signups };
}
