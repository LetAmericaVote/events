import createReducer from './utils/createReducer';
import {
  STORE_EVENT,
  STORE_EVENTS,
} from '../actions';

const storeFlags = (state, flags) => ({
  ...state,
  items: {
    ...state.items,
    ...flags.reduce((acc, flag) => {
      acc[flag.id] = {
        ...(state.items[flag.id] || {}),
        ...flag,
      };

      return acc;
    }, {}),
  },
});

const flag = createReducer('flag', {
  [STORE_FLAG]: (state, action) =>
    storeFlags(state, [action.flag]),
  [STORE_FLAGS]: (state, action) =>
    storeFlags(state, action.flags),
});

export default flag;
