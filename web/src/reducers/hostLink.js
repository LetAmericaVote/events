import createReducer from './utils/createReducer';
import {
  SET_HOST_LINK,
} from '../actions';

const hostLink = createReducer('hostLink', {
  [SET_HOST_LINK]: (state, action) => action.value,
});

export default hostLink;
