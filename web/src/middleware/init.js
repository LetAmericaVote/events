import UrlPattern from 'url-pattern';
import {
  HOME_ROUTE,
  SEARCH_ROUTE,
  EVENT_ROUTE,
} from '../routing/routes';
import {
  setInitValue,
  fetchPaginatedEvents,
  fetchEventById,
  fetchPaginatedEventSignups,
} from '../actions';
import {
  selectInitValue,
  selectRoutingPathname,
  selectLocationLon,
  selectLocationLat,
  selectLocationState,
  selectEventExists,
  selectSignupsForEventSortedByCreatedAt,
  selectEventIdBySlug,
} from '../selectors';

const REQUESTED_MAP_EVENTS = 'REQUESTED_MAP_EVENTS';
const REQUESTED_LOCATION_COORDS = 'REQUESTED_LOCATION_COORDS';
const REQUESTED_NEARBY_EVENTS = 'REQUESTED_NEARBY_EVENTS';
const REQUESTED_LOCATION_STATE = 'REQUESTED_LOCATION_STATE';
const REQUESTED_EVENT_DATA = 'REQUESTED_EVENT_DATA';
const REQUESTED_EVENT_SIGNUP_DATA = 'REQUESTED_EVENT_SIGNUP_DATA';

// TODO: This could probably be optimized so the logic only runs for relevant page.

const init = store => next => action => {
  const isHomeRoute = selectRoutingPathname(store.getState()) === HOME_ROUTE;
  const hasRequestedMapEvents = selectInitValue(store.getState());

  if (isHomeRoute && ! hasRequestedMapEvents) {
    store.dispatch(setInitValue(REQUESTED_MAP_EVENTS, true));
    store.dispatch(fetchPaginatedEvents(true));
  }

  const locationLon = selectLocationLon(store.getState());
  const locationLat = selectLocationLat(store.getState());
  const hasRequestedLocationCoords = selectInitValue(REQUESTED_LOCATION_COORDS, store.getState());

  if (isHomeRoute && (! locationLon || ! locationLat)) {
    store.dispatch(setInitValue(REQUESTED_LOCATION_COORDS, true));
    store.dispatch(fetchGeoLocationFromRemote());
  }

  const hasRequestedNearbyEvents = selectInitValue(REQUESTED_NEARBY_EVENTS, store.getState());

  if (isHomeRoute && locationLon && locationLat && ! hasRequestedNearbyEvents) {
    store.dispatch(setInitValue(REQUESTED_NEARBY_EVENTS, true));
    store.dispatch(fetchEventByGeoLocation(locationLon, locationLat, 50000));
  }

  const isSearchRoute = selectRoutingPathname(store.getState()) === SEARCH_ROUTE;
  const locationState = selectLocationState(store.getState());
  const hasRequestedLocationState = selectInitValue(REQUESTED_LOCATION_STATE, store.getState());

  if ((isHomeRoute || isSearchRoute) && ! locationState && ! hasRequestedLocationState) {
    store.dispatch(setInitValue(REQUESTED_LOCATION_STATE, true));
    store.dispatch(fetchGeoLocationFromRemote());
  }

  const { eventSlug } = new UrlPattern(EVENT_ROUTE).match(selectRoutingPathname(store.getState()));
  const isEventRoute = !!eventSlug;
  const eventId = isEventRoute ? selectEventIdBySlug(eventSlug, store.getState()) : false;
  const hasEventData = isEventRoute ? selectEventExists(eventId, store.getState()) : false;
  const eventRouteInitKey = `${REQUESTED_EVENT_DATA}_${eventId}`;
  const hasRequestedEventData = selectInitValue(eventRouteInitKey, store.getState());

  if (isEventRoute && ! hasEventData && ! hasRequestedEventData) {
    store.dispatch(setInitValue(eventRouteInitKey, true));
    store.dispatch(fetchEventById(eventId));
  }

  const eventSignupKey = `${REQUESTED_EVENT_SIGNUP_DATA}_${eventId}`;
  const hasRequestedEventSignupData = selectInitValue(eventSignupKey, store.getState());

  if (isEventRoute && ! hasRequestedEventSignupData) {
    store.dispatch(setInitValue(eventSignupKey, true));
    store.dispatch(fetchPaginatedEventSignups(eventId, true));
  }

  // TODO: Comment data.
};

export default init;
