import {
  selectActionMetaNameForEndpoint
} from '../selectors';
import {
  API_REQUEST_SUCCEEDED,
  FETCH_USER_BY_ID,
  UPDATE_AUTHENTICATED_USER,
  storeUser,
  getFromApi,
} from '../actions';

const usersOutgoingRequest = (store, action) => {
  switch (action.type) {
    case FETCH_USER_BY_ID: {
      store.dispatch(getFromApi(FETCH_USER_BY_ID, `/v1/users/id/${action.userId}`));
      break;
    }

    case UPDATE_AUTHENTICATED_USER: {
      // TODO: ...
      break;
    }

    default: break;
  }
}

const usersIncomingRequest = (store, action, metaActionName) => {
  switch (metaActionName) {
    case FETCH_USER_BY_ID:
    case UPDATE_AUTHENTICATED_USER: {
      const { data } = action;
      const { user } = data;

      if (! user) {
        break;
      }

      store.dispatch(storeUser(user));

      break;
    }

    default: break;
  }
}

const users = store => next => action => {
  if (action.type === API_REQUEST_SUCCEEDED) {
    const metaActionName = selectActionMetaNameForEndpoint(action.endpoint, store.getState());

    usersIncomingRequest(store, action, metaActionName);
  } else {
    usersOutgoingRequest(store, action);
  }

  return next(action);
};

export default users;
