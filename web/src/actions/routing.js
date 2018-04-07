export const SET_INTERNAL_PATH_NAME = 'SET_INTERNAL_PATH_NAME';

/**
 * Set the 'internal' pathname. Another words,
 * this action only updates the store. You probably
 * want to use `setPathName` instead.
 *
 * @param {String} pathname
 */
export function setInternalPathname(pathname) {
  return { type: SET_INTERNAL_PATH_NAME, pathname };
}

export const SET_PATH_NAME = 'SET_PATH_NAME';

/**
 * Set the applications pathname.
 *
 * @param {String} pathname
 */
export function setPathname(pathname) {
  return { type: SET_PATH_NAME, pathname };
}
