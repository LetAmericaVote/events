import {
  FETCH_PAGINATED_EVENTS,
  FETCH_EVENT_BY_ID,
  FETCH_EVENT_BY_SLUG,
  FETCH_EVENT_BY_GEO_LOCATION,
  API_REQUEST_SUCCEEDED,
  // API_REQUEST_FAILED, // TODO: Where should we handle errors?
  setApiActionMetaProperty,
  storeEvent,
  storeEvents,
  storeUsers,
  storeUser,
  getFromApi,
} from '../actions';
import {
  selectApiMetaCustomProperty,
} from '../selectors';
import processEvent from '../processors/event';

const META_START = 'start';
const META_MIN_DISTANCE = 'minDistance';
const META_EXCLUDED_ID = 'excludedId';

const eventOutgoingRequest = (store, action) => {
  switch (action.type) {
    case FETCH_PAGINATED_EVENTS: {
      const { sortByUpcoming } = action;
      const spaceName = `sortByUpcoming=${sortByUpcoming}`;

      const start = selectApiMetaCustomProperty(
        FETCH_PAGINATED_EVENTS,
        spaceName,
        META_START,
        store.getState()
      );

      const query = { sortByUpcoming };

      if (start) {
        query.start = start;
      }

      store.dispatch(getFromApi(
        FETCH_PAGINATED_EVENTS, spaceName, '/v1/events', query,
      ));
      break;
    }

    case FETCH_EVENT_BY_GEO_LOCATION: {
      const { lon, lat, maxDistance } = action;

      const spaceName = `lon=${lon},lat=${lat},maxDistance=${maxDistance}`;

      const minDistance = selectApiMetaCustomProperty(
        FETCH_EVENT_BY_GEO_LOCATION,
        spaceName,
        META_MIN_DISTANCE,
        store.getState()
      );

      const excludeId = selectApiMetaCustomProperty(
        FETCH_EVENT_BY_GEO_LOCATION,
        spaceName,
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

      store.dispatch(getFromApi(
        FETCH_EVENT_BY_GEO_LOCATION, spaceName, '/v1/events/location', query,
      ));
      break;
    }

    case FETCH_EVENT_BY_ID: {
      store.dispatch(getFromApi(
        FETCH_EVENT_BY_ID, 'id', `/v1/events/id/${action.eventId}`,
      ));

      break;
    }

    case FETCH_EVENT_BY_SLUG: {
      store.dispatch(getFromApi(
        FETCH_EVENT_BY_SLUG, 'slug', `/v1/events/slug/${action.slug}`,
      ));

      break;
    }

    default: break;
  }
};

const eventsIncomingRequest = (store, action) => {
  const { metaAction, space } = action;

  switch (metaAction) {
    case FETCH_EVENT_BY_ID:
    case FETCH_EVENT_BY_SLUG: {
      const { data } = action;
      const { event } = data;

      if (! event) {
        break;
      }

      const processedItem = processEvent(event);
      store.dispatch(storeEvent(processedItem.event));

      if (!!processedItem.user) {
        store.dispatch(storeUser(processedItem.user));
      }

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

      if (metaAction === FETCH_PAGINATED_EVENTS) {
        store.dispatch(setApiActionMetaProperty(
          FETCH_PAGINATED_EVENTS, space, META_START, lastEvent.id,
        ));
      }

      if (metaAction === FETCH_EVENT_BY_GEO_LOCATION) {
        store.dispatch(setApiActionMetaProperty(
          FETCH_EVENT_BY_GEO_LOCATION, space, META_MIN_DISTANCE, lastEvent.distance,
        ));

        const excludedId = processedData.events.map(event => event.id);
        store.dispatch(setApiActionMetaProperty(
          FETCH_EVENT_BY_GEO_LOCATION, space, META_EXCLUDED_ID, excludedId,
        ));
      }

      if (processedData.events.length) {
        store.dispatch(storeEvents(processedData.events));
      }

      if (processedData.users.length) {
        store.dispatch(storeUsers(processedData.users));
      }

      break;
    }

    default: break;
  }
};

const events = store => next => action => {
  if (action.type === API_REQUEST_SUCCEEDED) {
    eventsIncomingRequest(store, action);
  } else {
    eventOutgoingRequest(store, action);
  }

  return next(action);
};

export default events;
