import createReducer from './utils/createReducer';
import {
  SET_INTERNAL_PATH_NAME, SET_PATH_NAME,
} from '../actions';

const setPathName = (state, { pathname }) => ({
  ...state,
  pathname,
  history: !!state.pathname ? [
    state.pathname,
    ...state.history
  ] : [
    ...state.history,
  ],
});

const routing = createReducer('routing', {
  [SET_INTERNAL_PATH_NAME]: setPathName,
  [SET_PATH_NAME]: setPathName,
});

export default routing;
