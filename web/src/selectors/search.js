import { selectEvent } from './events';

/**
 * Select the search query value
 * @param  {Object} state Redux state
 * @return {String}       Search query value
 */
export const selectSearchQueryValue = (state) => state.search.query;

/**
 * Select the search results order
 *
 * @param  {Object} state Redux state
 * @return {Array<String>}      Order of ids
 */
export const selectSearchResultsOrder = (state) => state.search.order;

/**
 * Select the search resutls order filled with event data
 *
 * @param  {Object} state Redux state
 * @return {Array<Object>}      Event order filled with event data
 */
export const selectSearchResultsFilled = (state) =>
  (selectSearchResultsOrder(state) || []).map(eventId => ({
    id: eventId,
    ...(selectEvent(eventId, state) || {}),
  }));

/**
 * Select if the search is pending
 * @param  {Object} state Redux state
 * @return {Boolean}      True if the search is pending
 */
export const selectIsSearchPending = (state) => state.search.isPending;

/**
 * Select the search mode.
 *
 * @param  {Object} state Redux state
 * @return {String}       Search mode
 */
export const selectSearchMode = (state) => state.search.mode;

/**
 * Select if the search mode is the query type.
 *
 * @param  {Object} state Redux state
 * @return {Boolean}      True if query
 */
export const selectIsSearchModeQuery = (state) =>
  selectSearchMode(state) === 'query';
