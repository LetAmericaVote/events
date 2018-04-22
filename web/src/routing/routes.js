export const HOME_ROUTE = '/';
export const SEARCH_ROUTE = '/search';
export const EVENT_ROUTE = '/event/:eventSlug';
export const HOST_ROUTE = '/host/:hostCode';
export const PROFILE_ROUTE = '/profile';
export const GOOGLE_AUTH_ROUTE = '/googleauth';

export const makeEventRoute = (eventSlug) =>
  EVENT_ROUTE.replace(':eventSlug', eventSlug);

const routes = {
  HOME_ROUTE,
  SEARCH_ROUTE,
  EVENT_ROUTE,
  PROFILE_ROUTE,
  HOST_ROUTE,
  GOOGLE_AUTH_ROUTE,
  makeEventRoute,
};

export default routes;
