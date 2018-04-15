import { selectUser } from './users';

/**
 * Selec event items.
 *
 * @param  {Object} state Redux state
 * @return {Object}       Event items
 */
export const selectEvents = (state) => state.events.items;

/**
 * Select if the given even id exists in the store.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state   Redux state
 * @return {Boolean}        True if exists
 */
export const selectEventExists = (eventId, state) =>
  !!selectEvents(state)[eventId];

/**
 * Select an event by id.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state   Redux state
 * @return {Object|null}    Null if event is false-y
 */
export const selectEvent = (eventId, state) =>
  selectEventExists(eventId, state) ? ({
    ...selectEvents(state)[eventId],
    hostUser: selectUser(selectEvents(state)[eventId].hostUser, state) ||
      selectEvents(state)[eventId].hostUser || null,
  }) : null;

/**
 * Select an event by its slug.
 *
 * @param  {String} eventSlug Event slug
 * @param  {Object} state     Redux state
 * @return {String|null}      Event id if found, otherwise null
 */
export const selectEventIdBySlug = (eventSlug, state) =>
  Object.keys(selectEvents(state)).find(eventId =>
    selectEvent(eventId, state).slug === eventSlug
  );

/**
 * Select the title of an event.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if event is false-y
 */
export const selectEventTitle = (eventId, state) =>
  selectEventExists(eventId, state) ?
    selectEvent(eventId, state).title : null;

/**
 * Select the description of an event.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if event is false-y
 */
export const selectEventDescription = (eventId, state) =>
  selectEventExists(eventId, state) ?
    selectEvent(eventId, state).description : null;

/**
 * Select the city of an event.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if event is false-y
 */
export const selectEventCity = (eventId, state) =>
  selectEventExists(eventId, state) ?
    selectEvent(eventId, state).city : null;

/**
 * Select the dateTime of an event.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if event is false-y
 */
export const selectEventDateTime = (eventId, state) =>
  selectEventExists(eventId, state) ?
    selectEvent(eventId, state).dateTime : null;

/**
 * Select if the given event is open for signups.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state   Redux state
 * @return {Boolean}        True if open
 */
export const selectEventIsOpen = (eventId, state) =>
  selectEventExists(eventId, state) ?
    new Date(selectEventDateTime(eventId, state))
      .getTime() > Date.now() : false;

/**
 * Select the distance of an event.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if event is false-y
 */
export const selectEventDistance = (eventId, state) =>
  selectEventExists(eventId, state) ?
    (selectEvent(eventId, state).distance === undefined ?
      null : selectEvent(eventId, state).distance) : null;

/**
 * Select a list of events sorted by distance.
 * Excludes event that don't have a distance property.
 *
 * @param  {Object} state Redux state
 * @return {Array<Object>} List of events
 */
export const selectEventsSortedByDistance = (state) =>
  Object.keys(selectEvents(state))
    .filter(eventId => selectEventDistance(eventId, state) !== null)
    .map(eventId => selectEvent(eventId, state))
    .sort((eventA, eventB) => eventA.distance - eventB.distance);

/**
 * Select the description of an event.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if event is false-y
 */
export const selectEventGeoLocation = (eventId, state) =>
  selectEventExists(eventId, state) ?
    selectEvent(eventId, state).geoLocation : null;

/**
 * Select the longitude of an event.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if event is false-y
 */
export const selectEventLon = (eventId, state) =>
  selectEventExists(eventId, state) ?
    selectEventGeoLocation(eventId, state).geoLocation[0] : null;

/**
 * Select the latitude of an event.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if event is false-y
 */
export const selectEventLat = (eventId, state) =>
  selectEventExists(eventId, state) ?
    selectEventGeoLocation(eventId, state).geoLocation[1] : null;

/**
 * Select the header photo of an event.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if event is false-y
 */
export const selectEventHeaderPhoto = (eventId, state) =>
  selectEventExists(eventId, state) ?
    selectEvent(eventId, state).headerPhoto : null;

/**
 * Select the host user id of an event.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if event is false-y
 */
export const selectEventHostUserId = (eventId, state) =>
  selectEventExists(eventId, state) ?
    (
      (selectEvent(eventId, state).hostUser || {}).id ||
      selectEvent(eventId, state).hostUser
    ) : null;

/**
 * Select the slug of an event.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if event is false-y
 */
export const selectEventSlug = (eventId, state) =>
  selectEventExists(eventId, state) ?
    selectEvent(eventId, state).slug : null;

/**
 * Select the state of an event.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if event is false-y
 */
export const selectEventState = (eventId, state) =>
  selectEventExists(eventId, state) ?
    selectEvent(eventId, state).state : null;

/**
 * Select the street address of an event.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if event is false-y
 */
export const selectEventStreetAddress = (eventId, state) =>
  selectEventExists(eventId, state) ?
    selectEvent(eventId, state).streetAddress : null;

/**
 * Select the zipcode of an event.
 *
 * @param  {String} eventId Event id
 * @param  {Object} state  Redux state
 * @return {String|null}   null if event is false-y
 */
export const selectEventZipcode = (eventId, state) =>
  selectEventExists(eventId, state) ?
    selectEvent(eventId, state).zipcode : null;
