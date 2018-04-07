import {
  FETCH_PAGINATED_EVENTS,
  FETCH_EVENT_BY_ID,
  FETCH_EVENT_BY_SLUG,
  FETCH_EVENT_BY_GEO_LOCATION,
  API_REQUEST_SUCCEEDED,
  API_REQUEST_FAILED, // ??? Where should we handle error / move them to?
  setApiActionMetaProperty,
  storeEvent,
  storeEvents,
  getFromApi,
} from '../actions';
import {
  selectApiMetaCustomProperty,
  selectActionMetaNameForEndpoint,
} from '../selectors';
import processEvent from '../processors/event';

const META_START = 'start';
const META_SORT_BY_UPCOMING = 'sortByUpcoming';
const META_LON = 'lon';
const META_LAT = 'lat';
const META_MAX_DISTANCE = 'maxDistance';
const META_MIN_DISTANCE = 'minDistance';
const META_EXCLUDED_ID = 'excludedId';

const eventOutgoingRequest = (store, action) => {
  switch (action.type) {
    case FETCH_PAGINATED_EVENTS: {
      const { sortByUpcoming } = action;

      const lastSort = selectApiMetaCustomProperty(
        FETCH_PAGINATED_EVENTS,
        META_SORT_BY_UPCOMING,
        store.getState()
      );

      if (lastSort !== null && lastSort !== sortByUpcoming) {
        store.dispatch(setApiActionMetaProperty(
          FETCH_PAGINATED_EVENTS, META_START, null,
        ));
      }

      store.dispatch(setApiActionMetaProperty(
        FETCH_PAGINATED_EVENTS, META_SORT_BY_UPCOMING, sortByUpcoming,
      ));

      const start = selectApiMetaCustomProperty(
        FETCH_PAGINATED_EVENTS,
        META_START,
        store.getState()
      );

      const query = { sortByUpcoming };

      if (start) {
        query.start = start;
      }

      store.dispatch(getFromApi(FETCH_PAGINATED_EVENTS, '/v1/events', query));
      break;
    }

    case FETCH_EVENT_BY_GEO_LOCATION: {
      const { lon, lat, maxDistance } = action;

      const lastLon = selectApiMetaCustomProperty(
        FETCH_EVENT_BY_GEO_LOCATION,
        META_LON,
        store.getState()
      );

      const lastLat = selectApiMetaCustomProperty(
        FETCH_EVENT_BY_GEO_LOCATION,
        META_LAT,
        store.getState()
      );

      const lastMaxDistance = selectApiMetaCustomProperty(
        FETCH_EVENT_BY_GEO_LOCATION,
        META_MAX_DISTANCE,
        store.getState()
      );

      if (lon !== lastLon || lat !== lastLat || maxDistance !== lastMaxDistance) {
        store.dispatch(setApiActionMetaProperty(
          FETCH_EVENT_BY_GEO_LOCATION, META_MIN_DISTANCE, null,
        ));

        store.dispatch(setApiActionMetaProperty(
          FETCH_EVENT_BY_GEO_LOCATION, META_EXCLUDED_ID, null,
        ));
      }

      store.dispatch(setApiActionMetaProperty(
        FETCH_EVENT_BY_GEO_LOCATION, META_LON, lon,
      ));

      store.dispatch(setApiActionMetaProperty(
        FETCH_EVENT_BY_GEO_LOCATION, META_LAT, lat,
      ));

      store.dispatch(setApiActionMetaProperty(
        FETCH_EVENT_BY_GEO_LOCATION, META_MAX_DISTANCE, maxDistance,
      ));

      const minDistance = selectApiMetaCustomProperty(
        FETCH_EVENT_BY_GEO_LOCATION,
        META_MIN_DISTANCE,
        store.getState()
      );

      const excludeId = selectApiMetaCustomProperty(
        FETCH_EVENT_BY_GEO_LOCATION,
        META_EXCLUDED_ID,
        store.getState()
      );

      const query = { lon, lat, maxDistance };

      if (minDistance) {
        query.minDistance = minDistance;
      }

      if (excludeId) {
        query.excludeId = excludeId;
      }

      store.dispatch(getFromApi(FETCH_EVENT_BY_GEO_LOCATION, '/v1/events/location', query));
      break;
    }

    case FETCH_EVENT_BY_ID: {
      store.dispatch(getFromApi(FETCH_EVENT_BY_ID, `/v1/events/id/${action.eventId}`));
      break;
    }

    case FETCH_EVENT_BY_SLUG: {
      store.dispatch(getFromApi(FETCH_EVENT_BY_SLUG, `/v1/events/slug/${action.slug}`));
      break;
    }

    default: break;
  }
};

const eventsIncomingRequest = (store, action, metaActionName) => {
  switch (metaActionName) {
    case FETCH_EVENT_BY_ID:
    case FETCH_EVENT_BY_SLUG: {
      const { data } = action;
      const { event } = data;

      if (! event) {
        break;
      }

      const processedItem = processEvent(event);
      store.dispatch(storeEvent(processedItem.event));
      // TODO: store user

      break;
    }

    case FETCH_EVENT_BY_GEO_LOCATION:
    case FETCH_PAGINATED_EVENTS: {
      const { data } = action;
      const { events } = data;

      if (! events || ! events.length) {
        break;
      }

      const processedData = events.reduce((acc, event) => {
        const processedItem = processEvent(event);

        acc.events.push(processedItem.event);

        if (!!processedItem.user) {
          acc.users.push(processedItem.user);
        }

        return acc;
      }, {
        events: [],
        users: [],
      });

      const lastEvent = processedData.events[processedData.events.length - 1];

      if (metaActionName === FETCH_PAGINATED_EVENTS) {
        store.dispatch(setApiActionMetaProperty(
          FETCH_PAGINATED_EVENTS, META_START, lastEvent.id,
        ));
      }

      if (metaActionName === FETCH_EVENT_BY_GEO_LOCATION) {
        store.dispatch(setApiActionMetaProperty(
          FETCH_EVENT_BY_GEO_LOCATION, META_MIN_DISTANCE, lastEvent.distance,
        ));

        const excludedId = processedData.events.map(event => event.id);
        store.dispatch(setApiActionMetaProperty(
          FETCH_EVENT_BY_GEO_LOCATION, META_EXCLUDED_ID, excludedId,
        ));
      }

      store.dispatch(storeEvents(processedData.events));
      // TODO: Store users

      break;
    }

    default: break;
  }
};

const events = store => next => action => {
  if (action.type === API_REQUEST_SUCCEEDED) {
    const metaActionName = selectActionMetaNameForEndpoint(action.endpoint, store.getState());

    eventsIncomingRequest(store, action, metaActionName);
  } else {
    eventOutgoingRequest(store, action);
  }

  return next(action);
};

export default events;
