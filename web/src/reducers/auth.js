import createReducer from './utils/createReducer';
import {
  STORE_AUTH_CREDENTIALS,
} from '../actions';

const auth = createReducer('auth', {
  [STORE_AUTH_CREDENTIALS]: (state, action) => {
    const { userId, token } = action;

    sessionStorage.setItem(
      STORE_AUTH_CREDENTIALS,
      JSON.stringify({ userId, token })
    );

    return {
      ...state,
      userId,
      token,
    };
  },
});

export default auth;
