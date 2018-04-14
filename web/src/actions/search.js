export const SET_SEARCH_RESULT_ORDER = 'SET_SEARCH_RESULT_ORDER';

/**
 * Set the order of the search results.
 *
 * @param {Array<String>} order Array of event id's
 */
export function setSearchResultOrder(order) {
  return { type: SET_SEARCH_RESULT_ORDER, order };
}

export const SET_SEARCH_QUERY_VALUE = 'SET_SEARCH_QUERY_VALUE';

/**
 * Set the search query value.
 * @param {[type]} value [description]
 */
export function setSearchQueryValue(value) {
  return { type: SET_SEARCH_QUERY_VALUE, value };
}

export const SET_SEARCH_IS_PENDING = 'SET_SEARCH_IS_PENDING';

export function setSearchIsPending(isPending) {
  return { type: SET_SEARCH_IS_PENDING, isPending };
}

export const SET_SEARCH_MODE = 'SET_SEARCH_MODE';

/**
 * Set the search mode to either 'query' or 'geo'.
 *
 * @param {String} mode Mode type
 */
export function setSearchMode(mode) {
  return { type: SET_SEARCH_MODE, mode };
}
