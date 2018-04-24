import {
  API_REQUEST_SUCCEEDED,
  FETCH_USER_BY_ID,
  UPDATE_AUTHENTICATED_USER,
  FETCH_PAGINATED_USERS,
  FETCH_RANDOM_USERS,
  FETCH_BULK_USERS,
  storeUser,
  storeUsers,
  storeFlag,
  storeFlags,
  getFromApi,
  postToApi,
  setApiActionMetaProperty,
} from '../actions';
import {
  selectApiMetaCustomProperty,
  selectAuthUserId,
} from '../selectors';
import processUser from '../processors/user';

const META_USER_START = 'userStart';

const usersOutgoingRequest = (store, action) => {
  switch (action.type) {
    case FETCH_PAGINATED_USERS: {
      const userId = selectAuthUserId(store.getState());
      const spaceName = `userId=${userId}`;

      const start = selectApiMetaCustomProperty(
        FETCH_PAGINATED_USERS,
        spaceName,
        META_USER_START,
        store.getState()
      );

      const query = {};

      if (start) {
        query.start = start;
      }

      const endpoint = '/v1/users';
      store.dispatch(getFromApi(
        FETCH_PAGINATED_USERS, spaceName, endpoint, query,
      ));

      break;
    }

    case FETCH_BULK_USERS: {
      const { userIds } = action;
      const spaceName = `userIds=${userIds}`;

      const query = { userIds };

      store.dispatch(getFromApi(
        FETCH_BULK_USERS, spaceName, '/v1/users/bulk', query,
      ));

      break;
    }

    case FETCH_RANDOM_USERS: {
      store.dispatch(getFromApi(
        FETCH_RANDOM_USERS, 'random', `/v1/users/random`,
      ));

      break;
    }

    case FETCH_USER_BY_ID: {
      store.dispatch(getFromApi(
        FETCH_USER_BY_ID, action.userId, `/v1/users/id/${action.userId}`,
      ));

      break;
    }

    case UPDATE_AUTHENTICATED_USER: {
      store.dispatch(postToApi(
        UPDATE_AUTHENTICATED_USER, 'update', '/v1/users', action.fields,
      ));

      break;
    }

    default: break;
  }
}

const usersIncomingRequest = (store, action) => {
  const { metaAction, space } = action;

  switch (metaAction) {
    case FETCH_USER_BY_ID:
    case UPDATE_AUTHENTICATED_USER: {
      const { data } = action;
      const { user } = data;

      if (! user) {
        break;
      }

      const processedItem = processUser(user);

      if (processedItem.flag) {
        store.dispatch(storeFlag(processedItem.flag));
      }

      store.dispatch(storeUser(user));

      break;
    }

    case FETCH_BULK_USERS:
    case FETCH_RANDOM_USERS:
    case FETCH_PAGINATED_USERS: {
      const { data } = action;
      const { users } = data;

      if (! users || ! users.length) {
        break;
      }

      if (metaAction === FETCH_PAGINATED_USERS) {
        const lastUser = users[users.length - 1];

        store.dispatch(setApiActionMetaProperty(
          FETCH_PAGINATED_USERS, space, META_USER_START, lastUser.id,
        ));
      }

      const processedData = users.reduce((acc, user) => {
        const processedItem = processUser(user);

        acc.users.push(processedItem.user);

        if (!!processedItem.flag) {
          acc.flags.push(processedItem.flag);
        }

        return acc;
      }, {
        users: [],
        flags: [],
      });

      if (metaAction === FETCH_PAGINATED_USERS) {
        const lastUser = processedData.users[processedData.users.length - 1];

        store.dispatch(setApiActionMetaProperty(
          metaAction, space, META_START, lastUser.id,
        ));
      }

      if (processedData.flags.length) {
        store.dispatch(storeFlags(processedData.flags));
      }

      store.dispatch(storeUsers(processedData.users));
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
