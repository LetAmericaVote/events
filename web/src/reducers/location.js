import createReducer from './utils/createReducer';
import {
  STORE_GEO_LOCATION,
  STORE_CITY,
  STORE_STATE,
} from '../actions';

const location = createReducer('location', {
  [STORE_GEO_LOCATION]: (state, action) => ({
    ...state,
    lon: action.lon,
    lat: action.lat,
  }),
  [STORE_CITY]: (state, action) => ({
    ...state,
    city: action.city,
  }),
  [STORE_STATE]: (state, action) => ({
    ...state,
    state: action.state,
  }),
});

export default location;
