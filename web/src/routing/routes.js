export const HOME_ROUTE = '/';
export const SEARCH_ROUTE = '/search';
export const EVENT_ROUTE = '/event/:eventId';
export const PROFILE_ROUTE = '/profile';

export const makeEventRoute = (eventId) =>
  EVENT_ROUTE.replace(':eventId', eventId);

const routes = {
  HOME_ROUTE,
  SEARCH_ROUTE,
  EVENT_ROUTE,
  PROFILE_ROUTE,
  makeEventRoute,
};

export default routes;
