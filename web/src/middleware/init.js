import UrlPattern from 'url-pattern';
import {
  HOME_ROUTE,
  SEARCH_ROUTE,
  EVENT_ROUTE,
  EVENT_COMMENT_ROUTE,
  COMMENT_ROUTE,
} from '../routing/routes';
import {
  setInitValue,
  fetchPaginatedEvents,
  fetchEventBySlug,
  fetchPaginatedEventSignups,
  fetchGeoLocationFromRemote,
  fetchEventByGeoLocation,
  fetchRandomUsers,
  fetchUserById,
  fetchBulkUsers,
  fetchEventById,
  fetchBulkEvents,
  fetchPaginatedComments,
  fetchComment,
  STORE_SIGNUP,
  STORE_SIGNUPS,
  STORE_COMMENT,
  STORE_COMMENTS,
} from '../actions';
import {
  selectInitValue,
  selectRoutingPathname,
  selectLocationLon,
  selectLocationLat,
  selectLocationState,
  selectEventIdBySlug,
  selectUsersAsArray,
  selectUser,
  selectEvent,
  selectIsAuthenticatedUserSignedUpForEvent,
  selectAuthUserId,
  selectAuthenticatedUser,
} from '../selectors';
import { batchItems } from '../util';

const REQUESTED_MAP_EVENTS = 'REQUESTED_MAP_EVENTS';
const REQUESTED_LOCATION_COORDS = 'REQUESTED_LOCATION_COORDS';
const REQUESTED_NEARBY_EVENTS = 'REQUESTED_NEARBY_EVENTS';
const REQUESTED_LOCATION_STATE = 'REQUESTED_LOCATION_STATE';
const REQUESTED_EVENT_DATA = 'REQUESTED_EVENT_DATA';
const REQUESTED_EVENT_SIGNUP_DATA = 'REQUESTED_EVENT_SIGNUP_DATA';
const REQUESTED_USER_GALLERY = 'REQUESTED_USER_GALLERY';
const REQUESTED_TOP_LEVEL_COMMENTS = 'REQUESTED_TOP_LEVEL_COMMENTS';
const REQUESTED_REPLIES = 'REQUESTED_REPLIES';
const REQUESTED_COMMENT_MODAL = 'REQUESTED_COMMENT_MODAL';
const REQUESTED_AUTH_USER_DATA = 'REQUESTED_AUTH_USER_DATA';

// TODO: This could probably be optimized so the logic only runs for relevant page.

const init = store => next => action => {
  next(action);

  const authId = selectAuthUserId(store.getState());
  const authUser = selectAuthenticatedUser(store.getState());
  const hasRequestedAuthUserData = selectInitValue(REQUESTED_AUTH_USER_DATA, store.getState());
  if (authId && ! authUser && ! hasRequestedAuthUserData) {
    next(setInitValue(REQUESTED_AUTH_USER_DATA, true));
    store.dispatch(fetchUserById(authId));

    return;
  }

  const isHomeRoute = selectRoutingPathname(store.getState()) === HOME_ROUTE;
  const hasRequestedMapEvents = selectInitValue(REQUESTED_MAP_EVENTS, store.getState());

  if (isHomeRoute && ! hasRequestedMapEvents) {
    next(setInitValue(REQUESTED_MAP_EVENTS, true));
    store.dispatch(fetchPaginatedEvents(true));

    return;
  }

  const locationLon = selectLocationLon(store.getState());
  const locationLat = selectLocationLat(store.getState());
  const hasRequestedLocationCoords = selectInitValue(REQUESTED_LOCATION_COORDS, store.getState());

  if (isHomeRoute && (! locationLon || ! locationLat) && ! hasRequestedLocationCoords) {
    next(setInitValue(REQUESTED_LOCATION_COORDS, true));
    store.dispatch(fetchGeoLocationFromRemote());

    return;
  }

  const hasRequestedNearbyEvents = selectInitValue(REQUESTED_NEARBY_EVENTS, store.getState());

  if (isHomeRoute && locationLon && locationLat && ! hasRequestedNearbyEvents) {
    next(setInitValue(REQUESTED_NEARBY_EVENTS, true));
    store.dispatch(fetchEventByGeoLocation(locationLon, locationLat, 50000));

    return;
  }

  const isSearchRoute = selectRoutingPathname(store.getState()) === SEARCH_ROUTE;
  const locationState = selectLocationState(store.getState());
  const hasRequestedLocationState = selectInitValue(REQUESTED_LOCATION_STATE, store.getState());

  if ((isHomeRoute || isSearchRoute) && ! locationState && ! hasRequestedLocationState) {
    next(setInitValue(REQUESTED_LOCATION_STATE, true));
    store.dispatch(fetchGeoLocationFromRemote());

    return;
  }

  const hasRequestedUserGallery = selectInitValue(REQUESTED_USER_GALLERY, store.getState());
  const totalUsersInStore = selectUsersAsArray(store.getState());

  if (isHomeRoute && totalUsersInStore < 25 && ! hasRequestedUserGallery) {
    next(setInitValue(REQUESTED_USER_GALLERY, true));
    store.dispatch(fetchRandomUsers());

    return;
  }

  const eventPageMatch = new UrlPattern(EVENT_ROUTE).match(selectRoutingPathname(store.getState()));
  const eventCommentMatch = new UrlPattern(EVENT_COMMENT_ROUTE).match(selectRoutingPathname(store.getState()));
  const eventMatch = eventPageMatch || eventCommentMatch;

  const eventSlug = eventMatch ? eventMatch.eventSlug : false;
  const isEventRoute = !!eventSlug;
  const eventId = isEventRoute ? selectEventIdBySlug(eventSlug, store.getState()) : false;
  const hasEventData = !!eventId;
  const eventRouteInitKey = `${REQUESTED_EVENT_DATA}_${eventSlug}`;
  const hasRequestedEventData = selectInitValue(eventRouteInitKey, store.getState());

  if (isEventRoute && ! hasEventData && ! hasRequestedEventData) {
    next(setInitValue(eventRouteInitKey, true));
    store.dispatch(fetchEventBySlug(eventSlug));

    return;
  }

  const eventSignupKey = `${REQUESTED_EVENT_SIGNUP_DATA}_${eventId}`;
  const hasRequestedEventSignupData = selectInitValue(eventSignupKey, store.getState());

  if (isEventRoute && hasEventData && ! hasRequestedEventSignupData) {
    next(setInitValue(eventSignupKey, true));
    store.dispatch(fetchPaginatedEventSignups(eventId, true, true));

    return;
  }

  const topLevelCommentsKey = `${REQUESTED_TOP_LEVEL_COMMENTS}_${eventId}`;
  const hasRequestedTopLevelComments = selectInitValue(topLevelCommentsKey, store.getState());
  const isSignedUp = selectIsAuthenticatedUserSignedUpForEvent(eventId, store.getState());

  if (isEventRoute && ! hasRequestedTopLevelComments && isSignedUp) {
    next(setInitValue(topLevelCommentsKey, true));
    store.dispatch(fetchPaginatedComments(-1, eventId, null, 'top', 5));

    return;
  }

  const commentRouteMatch = new UrlPattern(COMMENT_ROUTE).match(selectRoutingPathname(store.getState()));
  const commentId = eventCommentMatch ? eventCommentMatch.commentId : (
    commentRouteMatch ? commentRouteMatch.commentId : null
  );
  const commentRouteKey = `${REQUESTED_COMMENT_MODAL}_${commentId}`;
  const hasRequestedCommentRouteData = selectInitValue(commentRouteKey, store.getState());

  if (commentId && ! hasRequestedCommentRouteData) {
    next(setInitValue(commentRouteKey, true));
    store.dispatch(fetchComment(commentId));

    return;
  }

  if (action.type === STORE_SIGNUP) {
    const { signup } = action;
    const missingUser = ! selectUser(signup.user, store.getState()) ||
      ! selectUser(signup.user, store.getState()).createdAt;

    if (missingUser) {
      store.dispatch(fetchUserById(signup.user));
    }

    const missingEvent = ! selectEvent(signup.event, store.getState()) ||
      ! selectEvent(signup.event, store.getState()).createdAt;

    if (missingEvent) {
      store.dispatch(fetchEventById(signup.event));
    }

    return;
  }

  if (action.type === STORE_SIGNUPS) {
    const { signups } = action;
    const missingUsers = signups.filter(signup =>
      ! selectUser(signup.user, store.getState()) ||
      ! selectUser(signup.user, store.getState()).createdAt);

    if (missingUsers.length) {
      const batches = batchItems(missingUsers);

      batches.forEach(batch =>
        store.dispatch(fetchBulkUsers(
          batch.map(signup => signup.user)
        )));
    }

    const missingEvents = signups.filter(signup =>
      ! selectEvent(signup.event, store.getState()) ||
      ! selectEvent(signup.event, store.getState()).createdAt);

    if (missingEvents.length) {
      const batches = batchItems(missingEvents);

      batches.forEach(batch =>
        store.dispatch(fetchBulkEvents(
          batch.map(signup => signup.event)
        )));
    }

    return;
  }

  function requestReplies(comment) {
    if (comment.inReplyTo) {
      return;
    }

    const replyKey = `${REQUESTED_REPLIES}_${comment.id}`;
    const hasRequestedReplies = selectInitValue(replyKey, store.getState());

    if (hasRequestedReplies) {
      return;
    }

    next(setInitValue(replyKey, true));
    store.dispatch(fetchPaginatedComments(-1, comment.event, null, comment.id, 3));
  }

  // TODO: Request flag.

  if (action.type === STORE_COMMENT) {
    const { comment } = action;

    setTimeout(0, () => requestReplies(comment));
  }

  if (action.type === STORE_COMMENTS) {
    const { comments } = action;

    comments.forEach(comment => setTimeout(0, requestReplies(comment)));
  }
};

export default init;
