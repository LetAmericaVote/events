import createReducer from './utils/createReducer';
import {
  STORE_USER,
  STORE_USERS,
} from '../actions';

const storeUsers = (state, users) => ({
  ...state,
  items: {
    ...state.items,
    ...users.reduce((acc, user) => {
      acc[user.id] = {
        ...(state.items[user.id] || {}),
        ...user,
      };

      return acc;
    }, {}),
  },
});

const users = createReducer('users', {
  [STORE_USER]: (state, action) =>
    storeUsers(state, [action.user]),
  [STORE_USERS]: (state, action) =>
    storeUsers(state, action.users),
});

export default users;
