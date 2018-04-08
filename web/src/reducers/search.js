import createReducer from './utils/createReducer';
import {
  SET_SEARCH_QUERY_VALUE,
  SET_SEARCH_RESULT_ORDER,
} from '../actions';

const search = createReducer('search', {
  [SET_SEARCH_QUERY_VALUE]: (state, action) => ({
    ...state,
    query: action.value,
  }),
  [SET_SEARCH_RESULT_ORDER]: (state, action) => ({
    ...state,
    order: action.order,
  }),
});

export default search;
