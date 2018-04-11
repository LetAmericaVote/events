/**
 * Select host link.
 *
 * @param  {Object} state Redux state
 * @return {String|null}  String if found, null otherwise
 */
export const selectHostLink = (state) => state.hostLink || null;
