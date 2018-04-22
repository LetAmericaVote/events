import UrlPattern from 'url-pattern';
import {
  HOME_ROUTE,
  SEARCH_ROUTE,
  EVENT_ROUTE,
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
  STORE_SIGNUP,
  STORE_SIGNUPS,
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
} from '../selectors';
import { batchItems } from '../util';

const REQUESTED_MAP_EVENTS = 'REQUESTED_MAP_EVENTS';
const REQUESTED_LOCATION_COORDS = 'REQUESTED_LOCATION_COORDS';
const REQUESTED_NEARBY_EVENTS = 'REQUESTED_NEARBY_EVENTS';
const REQUESTED_LOCATION_STATE = 'REQUESTED_LOCATION_STATE';
const REQUESTED_EVENT_DATA = 'REQUESTED_EVENT_DATA';
const REQUESTED_EVENT_SIGNUP_DATA = 'REQUESTED_EVENT_SIGNUP_DATA';
const REQUESTED_USER_GALLERY = 'REQUESTED_USER_GALLERY';

// TODO: This could probably be optimized so the logic only runs for relevant page.

const init = store => next => action => {
  next(action);

  const isHomeRoute = selectRoutingPathname(store.getState()) === HOME_ROUTE;
  const hasRequestedMapEvents = selectInitValue(REQUESTED_MAP_EVENTS, store.getState());

  if (isHomeRoute && ! hasRequestedMapEvents) {
    next(setInitValue(REQUESTED_MAP_EVENTS, true));
    store.dispatch(fetchPaginatedEvents(true));

    return next(action);
  }

  const locationLon = selectLocationLon(store.getState());
  const locationLat = selectLocationLat(store.getState());
  const hasRequestedLocationCoords = selectInitValue(REQUESTED_LOCATION_COORDS, store.getState());

  if (isHomeRoute && (! locationLon || ! locationLat) && ! hasRequestedLocationCoords) {
    next(setInitValue(REQUESTED_LOCATION_COORDS, true));
    store.dispatch(fetchGeoLocationFromRemote());

    return next(action);
  }

  const hasRequestedNearbyEvents = selectInitValue(REQUESTED_NEARBY_EVENTS, store.getState());

  if (isHomeRoute && locationLon && locationLat && ! hasRequestedNearbyEvents) {
    next(setInitValue(REQUESTED_NEARBY_EVENTS, true));
    store.dispatch(fetchEventByGeoLocation(locationLon, locationLat, 50000));

    return next(action);
  }

  const isSearchRoute = selectRoutingPathname(store.getState()) === SEARCH_ROUTE;
  const locationState = selectLocationState(store.getState());
  const hasRequestedLocationState = selectInitValue(REQUESTED_LOCATION_STATE, store.getState());

  if ((isHomeRoute || isSearchRoute) && ! locationState && ! hasRequestedLocationState) {
    next(setInitValue(REQUESTED_LOCATION_STATE, true));
    store.dispatch(fetchGeoLocationFromRemote());

    return next(action);
  }

  const hasRequestedUserGallery = selectInitValue(REQUESTED_USER_GALLERY, store.getState());
  const totalUsersInStore = selectUsersAsArray(store.getState());

  if (isHomeRoute && totalUsersInStore < 25 && ! hasRequestedUserGallery) {
    next(setInitValue(REQUESTED_USER_GALLERY, true));
    store.dispatch(fetchRandomUsers());

    return next(action);
  }

  const eventMatch = new UrlPattern(EVENT_ROUTE).match(selectRoutingPathname(store.getState()));
  const eventSlug = eventMatch ? eventMatch.eventSlug : false;
  const isEventRoute = !!eventSlug;
  const eventId = isEventRoute ? selectEventIdBySlug(eventSlug, store.getState()) : false;
  const hasEventData = !!eventId;
  const eventRouteInitKey = `${REQUESTED_EVENT_DATA}_${eventSlug}`;
  const hasRequestedEventData = selectInitValue(eventRouteInitKey, store.getState());

  if (isEventRoute && ! hasEventData && ! hasRequestedEventData) {
    next(setInitValue(eventRouteInitKey, true));
    store.dispatch(fetchEventBySlug(eventSlug));

    return next(action);
  }

  const eventSignupKey = `${REQUESTED_EVENT_SIGNUP_DATA}_${eventId}`;
  const hasRequestedEventSignupData = selectInitValue(eventSignupKey, store.getState());

  if (isEventRoute && hasEventData && ! hasRequestedEventSignupData) {
    next(setInitValue(eventSignupKey, true));
    store.dispatch(fetchPaginatedEventSignups(eventId, true));

    return next(action);
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
};

export default init;
