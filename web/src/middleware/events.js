import {
  FETCH_PAGINATED_EVENTS,
  FETCH_EVENT_BY_ID,
  FETCH_EVENT_BY_SLUG,
  FETCH_EVENT_BY_GEO_LOCATION,
  API_REQUEST_SUCCEEDED,
  API_REQUEST_FAILED, // ??? Where should we handle error / move them to?
  setApiActionMetaProperty,
  setApiActionMetaEndpoint,
  storeEvent,
  storeEvents,
  getFromApi,
} from '../actions';
import {
  selectApiMetaCustomProperty,
  selectActionMetaNameForEndpoint,
} from '../selectors';

const META_START = 'start';
const META_SORT_BY_UPCOMING = 'sortByUpcoming';

const eventOutgoingRequest = (store, next, action) => {
  if (action.type === FETCH_PAGINATED_EVENTS) {
    const { sortByUpcoming } = action;
    const lastSort = selectApiMetaCustomProperty(
      FETCH_PAGINATED_EVENTS,
      META_SORT_BY_UPCOMING,
      store.getState()
    );

    if (lastSort && lastSort !== sortByUpcoming) {
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
  }
};

const eventsIncomingRequest = (store, next, action, metaActionName) => {
  if (metaActionName === FETCH_PAGINATED_EVENTS) {
    console.log(action);
  }
};

const events = store => next => action => {
  if (action.type === API_REQUEST_SUCCEEDED) {
    const metaActionName = selectActionMetaNameForEndpoint(action.endpoint, store.getState());

    eventsIncomingRequest(store, next, action, metaActionName);
  } else {
    eventOutgoingRequest(store, next, action);
  }

  return next(action);
};

export default events;
