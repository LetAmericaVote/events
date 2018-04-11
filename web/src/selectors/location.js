export const selectLocation = (state) => state.location;

export const selectLocationCity = (state) =>
  selectLocation(state).city || null;

export const selectLocationState = (state) =>
  selectLocation(state).state || null;

export const selectLocationLon = (state) =>
  selectLocation(state).lon || null;

export const selectLocationLat = (state) =>
  selectLocation(state).lat || null;

export const selectLocationGeoCoords = (state) => ({
  lon: selectLocationLon(state),
  lat: selectLocationLat(state),
});
