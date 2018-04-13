import createReducer from './utils/createReducer';
import {
  SET_SEARCH_QUERY_VALUE,
  SET_SEARCH_RESULT_ORDER,
  SET_SEARCH_IS_PENDING,
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
  [SET_SEARCH_IS_PENDING]: (state, action) => ({
    ...state,
    isPending: action.isPending,
  }),
});

export default search;
