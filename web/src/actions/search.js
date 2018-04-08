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
