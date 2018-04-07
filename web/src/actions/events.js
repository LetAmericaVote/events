export const FETCH_PAGINATED_EVENTS = 'FETCH_PAGINATED_EVENTS';

/**
 * Fetch a paginated list of events optionally sorted by dateTime.
 * Automatically inserts the last page.
 *
 * @param  {Boolean} [sortByUpcoming=false] Sort by the event dateTime
 */
export function fetchPaginatedEvents(sortByUpcoming = false) {
  return { type: FETCH_PAGINATED_EVENTS, sortByUpcoming };
}

export const FETCH_EVENT_BY_ID = 'FETCH_EVENT_BY_ID';

/**
 * Fetch an event by its ID.
 *
 * @param  {String} eventId The event id
 */
export function fetchEventById(eventId) {
  return { type: FETCH_EVENT_BY_ID, eventId };
}

export const FETCH_EVENT_BY_SLUG = 'FETCH_EVENT_BY_SLUG';

/**
 * Fetch an event by its slug.
 *
 * @param  {String} slug The event slug
 */
export function fetchEventBySlug(slug) {
  return { type: FETCH_EVENT_BY_SLUG, slug };
}

export const FETCH_EVENT_BY_GEO_LOCATION = 'FETCH_EVENT_BY_GEO_LOCATION';

/**
 * Fetch a paginated array of events by near a central point, sorted by
 * distance.
 *
 * @param  {Float} lon Center point longitude
 * @param  {Float} lat Center point latitude
 * @param  {Int} maxDistance The max amount of meters to search out for
 * @param  {Array<String>} excludeId Array of events to exclude in future geo queries
 */
export function fetchEventByGeoLocation(lon, lat, maxDistance, excludeId) {
  return { type: FETCH_EVENT_BY_GEO_LOCATION, lon, lat, maxDistance, excludeId };
}

export const STORE_EVENT = 'STORE_EVENT';

/**
 * Store an event to the redux store.
 *
 * @param  {Event} event  Event
 */
export function storeEvent(event) {
  return { type: STORE_EVENT, event };
}

export const STORE_EVENTS = 'STORE_EVENTS';

/**
 * Store an array of events to the store.
 *
 * @param  {Array<Event>} events Array of events
 */
export function storeEvents(events) {
  return { type: STORE_EVENTS, events };
}
