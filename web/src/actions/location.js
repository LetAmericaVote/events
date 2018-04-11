export const FETCH_GEO_LOCATION_FROM_REMOTE = 'FETCH_GEO_LOCATION_FROM_REMOTE';

/**
 * Fetch the users current approximate location based on IP.
 */
export function fetchGeoLocationFromRemote() {
  return { type: FETCH_GEO_LOCATION_FROM_REMOTE };
}

export const STORE_GEO_LOCATION = 'STORE_GEO_LOCATION';

/**
 * Store the users approximate lon/lat.
 *
 * @param  {Float} lon Longitude
 * @param  {Float} lat Latitude
 */
export function storeGeoLocation(lon, lat) {
  return { type: STORE_GEO_LOCATION, lon, lat };
}

export const STORE_CITY = 'STORE_CITY';

/**
 * Store the users approximate city.
 *
 * @param  {String} city City
 */
export function storeCity(city) {
  return { type: STORE_CITY, city };
}

export const STORE_STATE = 'STORE_STATE';

/**
 * Store the users approximate state.
 * @param  {String} state State
 */
export function storeState(state) {
  return { type: STORE_STATE, state };
}
