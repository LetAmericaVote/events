import {
  FETCH_GEO_LOCATION_FROM_REMOTE,
  API_REQUEST_SUCCEEDED,
  storeGeoLocation,
  storeCity,
  storeState,
  getFromApi,
} from '../actions';

const hostLink = store => next => action => {
  if (action.type === FETCH_GEO_LOCATION_FROM_REMOTE) {
    store.dispatch(getFromApi(
      FETCH_GEO_LOCATION_FROM_REMOTE, 'geo', `/v1/location`,
    ));
  } else if (action.type === API_REQUEST_SUCCEEDED
    && action.metaAction === FETCH_GEO_LOCATION_FROM_REMOTE) {

    const { data } = action;
    const { state, city, lon, lat } = data;

    if (state) {
      store.dispatch(storeState(state));
    }

    if (city) {
      store.dispatch(storeCity(city));
    }

    if (lon && lat) {
      store.dispatch(storeGeoLocation(lon, lat));
    }
  }

  return next(action);
};

export default hostLink;
