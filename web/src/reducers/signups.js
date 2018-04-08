import createReducer from './utils/createReducer';
import {
  STORE_SIGNUP,
  STORE_SIGNUPS,
} from '../actions';

const storeSignups = (state, signups) => ({
  ...state,
  items: {
    ...state.items,
    ...signups.reduce((acc, signup) => {
      acc[signup.id] = {
        ...(state.items[signup.id] || {}),
        ...signup,
      };

      return acc;
    }, {}),
  },
});

const signups = createReducer('signups', {
  [STORE_SIGNUP]: (state, action) =>
    storeSignups(state, [action.signup]),
  [STORE_SIGNUPS]: (state, action) =>
    storeSignups(state, action.signups),
});

export default signups;
