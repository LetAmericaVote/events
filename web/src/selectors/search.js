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

export const selectIsSearchPending = (state) => state.search.isPending;
