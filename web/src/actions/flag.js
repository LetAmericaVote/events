export const FETCH_FLAG_BY_ID = 'FETCH_FLAG_BY_ID';

/**
 * Fetch a flag by its id.
 *
 * @param  {String} flagId Flag id
 */
export function fetchFlagById(flagId) {
  return { type: FETCH_FLAG_BY_ID, flagId };
}

export const POST_FLAG = 'POST_FLAG';

/**
 * Post a flag.
 *
 * @param  {String} reason     Textual reason describing the flag
 * @param  {String} targetType The model type being targeted (['signup', 'comment', 'user'])
 * @param  {String} targetId   The id of the model being targeted
 */
export function postFlag(reason, targetType, targetId) {
  return { type: POST_FLAG, reason, targetType, targetId };
}
