import {
  API_REQUEST_SUCCEEDED,
  FETCH_USER_BY_ID,
  UPDATE_AUTHENTICATED_USER,
  storeUser,
  getFromApi,
  postToApi,
} from '../actions';

const usersOutgoingRequest = (store, action) => {
  switch (action.type) {
    case FETCH_USER_BY_ID: {
      store.dispatch(getFromApi(FETCH_USER_BY_ID, 'id', `/v1/users/id/${action.userId}`));
      break;
    }

    case UPDATE_AUTHENTICATED_USER: {
      store.dispatch(postToApi(UPDATE_AUTHENTICATED_USER, 'update', '/v1/users', action.fields));
      break;
    }

    default: break;
  }
}

const usersIncomingRequest = (store, action) => {
  const { metaActionName } = action;
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
    usersIncomingRequest(store, action);
  } else {
    usersOutgoingRequest(store, action);
  }

  return next(action);
};

export default users;
