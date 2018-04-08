import {
  FETCH_PAGINATED_USER_SIGNUPS,
  FETCH_PAGINAED_EVENT_SIGNUPS,
  FETCH_USER_SIGNUP_STATUS,
  SIGNUP_FOR_EVENT,
  API_REQUEST_SUCCEEDED,
  setApiActionMetaProperty,
  storeSignup,
  storeSignups,
  storeUsers,
  storeUser,
  storeEvent,
  storeEvents,
  getFromApi,
  postToApi,
} from '../actions';
import {
  selectApiMetaCustomProperty,
  selectAuthUserId,
} from '../selectors';
import processSignup from '../processors/signup';

const META_USER_START = 'userStart';
const META_EVENT_START = 'eventStart';

const signupOutgoingRequest = (store, action) => {
  switch (action.type) {
    case FETCH_PAGINATED_USER_SIGNUPS: {
      const userId = selectAuthUserId(store.getState());
      const spaceName = `userId=${userId}`;

      const start = selectApiMetaCustomProperty(
        FETCH_PAGINATED_USER_SIGNUPS,
        spaceName,
        META_USER_START,
        store.getState()
      );

      const query = {};

      if (start) {
        query.start = start;
      }

      const endpoint = '/v1/signups/user';
      store.dispatch(getFromApi(
        FETCH_PAGINATED_USER_SIGNUPS, spaceName, endpoint, query,
      ));
      break;
    }

    case FETCH_PAGINAED_EVENT_SIGNUPS: {
      const { eventId, sortBySignupDate } = action;
      const spaceName = `eventId=${eventId},sortBySignupDate=${sortBySignupDate}`;

      const start = selectApiMetaCustomProperty(
        FETCH_PAGINAED_EVENT_SIGNUPS,
        spaceName,
        META_EVENT_START,
        store.getState()
      );

      const query = { sortBySignupDate };

      if (start) {
        query.start = start;
      }

      const endpoint = `/v1/signups/event/${eventId}`;
      store.dispatch(getFromApi(
        FETCH_PAGINAED_EVENT_SIGNUPS, spaceName, endpoint, query
      ));
      break;
    }

    case FETCH_USER_SIGNUP_STATUS: {
      const endpoint = `/v1/signups/user/status/${action.eventId}`;
      store.dispatch(getFromApi(FETCH_USER_SIGNUP_STATUS, 'status', endpoint));
      break;
    }

    case SIGNUP_FOR_EVENT: {
      const endpoint = `/v1/signups/event/${action.eventId}`;
      store.dispatch(postToApi(SIGNUP_FOR_EVENT, 'signup', endpoint));
      break;
    }

    default: break;
  }
};

const signupIncomingRequest = (store, action) => {
  const { metaActionName, space } = action;

  switch (metaActionName) {
    case FETCH_USER_SIGNUP_STATUS:
    case SIGNUP_FOR_EVENT: {
      const { data } = action;
      const { signup } = data;

      if (! signup) {
        break;
      }

      const processedItem = processSignup(signup);
      store.dispatch(storeSignup(processedItem.signup));

      if (!!processedItem.event) {
        store.dispatch(storeEvent(processedItem.event));
      }

      if (!!processedItem.user) {
        store.dispatch(storeUser(processedItem.user));
      }

      break;
    }

    case FETCH_PAGINAED_EVENT_SIGNUPS:
    case FETCH_PAGINATED_USER_SIGNUPS: {
      const { data } = action;
      const { signups } = data;

      if (! signups || ! signups.length) {
        break;
      }

      const processedData = signups.reduce((acc, signup) => {
        const processedItem = processSignup(signup);

        acc.signups.push(processedItem.signup);

        if (!!processedItem.user) {
          acc.users.push(processedItem.user);
        }

        if (!!processedItem.event) {
          acc.events.push(processedItem.event);
        }

        return acc;
      }, {
        signups: [],
        events: [],
        users: [],
      });

      const lastSignup = processedData.signups[processedData.signups.length - 1];

      if (metaActionName === FETCH_PAGINAED_EVENT_SIGNUPS) {
        store.dispatch(setApiActionMetaProperty(
          FETCH_PAGINAED_EVENT_SIGNUPS, space, META_EVENT_START, lastSignup.user,
        ));
      }

      if (metaActionName === FETCH_PAGINATED_USER_SIGNUPS) {
        store.dispatch(setApiActionMetaProperty(
          FETCH_PAGINATED_USER_SIGNUPS, space, META_USER_START, lastSignup.event,
        ));
      }

      if (processedData.signups.length) {
        store.dispatch(storeSignups(processedData.signups));
      }

      if (processedData.events.length) {
        store.dispatch(storeEvents(processedData.events));
      }

      if (processedData.users.length) {
        store.dispatch(storeUsers(processedData.users));
      }

      break;
    }

    default: break;
  }
};

const events = store => next => action => {
  if (action.type === API_REQUEST_SUCCEEDED) {
    signupIncomingRequest(store, action);
  } else {
    signupOutgoingRequest(store, action);
  }

  return next(action);
};

export default events;
