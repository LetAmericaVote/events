export const HOME_ROUTE = '/';
export const SEARCH_ROUTE = '/search';
export const EVENT_ROUTE = '/event/:eventSlug';
export const EVENT_COMMENT_ROUTE = '/event/:eventSlug/comment/:commentId';
export const COMMENT_ROUTE = '/comment/:commentId';
export const HOST_ROUTE = '/host/:hostCode';
export const PROFILE_ROUTE = '/profile';

export const makeEventRoute = (eventSlug) =>
  EVENT_ROUTE.replace(':eventSlug', eventSlug);

export const makeCommentRoute = (commentId) =>
  COMMENT_ROUTE.replace(':commentId', commentId);

export const makeEventCommentRoute = (eventSlug, commentId) =>
  EVENT_COMMENT_ROUTE.replace(':eventSlug', eventSlug)
    .replace(':commentId', commentId);

const routes = {
  HOME_ROUTE,
  SEARCH_ROUTE,
  EVENT_ROUTE,
  PROFILE_ROUTE,
  HOST_ROUTE,
  COMMENT_ROUTE,
  EVENT_COMMENT_ROUTE,
  makeEventRoute,
  makeCommentRoute,
  makeEventCommentRoute,
};

export default routes;
