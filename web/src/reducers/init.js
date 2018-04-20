import createReducer from './utils/createReducer';
import {
  SET_INIT_VALUE,
} from '../actions';

const init = createReducer('init', {
  [SET_INIT_VALUE]: (state, action) => ({
    ...state,
    [action.key]: action.value,
  }),
});

export default init;
