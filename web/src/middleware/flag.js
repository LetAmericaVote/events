import {
  FETCH_FLAG_BY_ID,
  POST_FLAG,
  API_REQUEST_SUCCEEDED,
  storeSignup,
  storeComment,
  storeUsers,
  storeEvent,
  storeFlag,
  getFromApi,
  postToApi,
} from '../actions';
import processFlag from '../processors/flag';

const flag = store => next => action => {
  if (action.type === FETCH_FLAG_BY_ID) {
    const { flagId } = action;
    const spaceName = `flagId=${flagId}`;

    store.dispatch(getFromApi(
      FETCH_FLAG_BY_ID, spaceName, `/v1/flags/id/${flagId}`,
    ));
  } else if (action.type === POST_FLAG) {
    const { reason, targetType, targetId } = action;
    const spaceName = `targetType=${targetType},${targetId}=${targetId}`;

    const payload = { reason, targetType, targetId };

    store.dispatch(postToApi(
      POST_FLAG, spaceName, `/v1/flags`, payload,
    ));
  } else if (action.type === API_REQUEST_SUCCEEDED
    && (action.metaAction === FETCH_FLAG_BY_ID ||
        action.metaAction === POST_FLAG)) {

    const { data } = action;
    const { flag } = data;

    if (! flag) {
      return next(action);
    }

    const processedItem = processFlag(flag);
    store.dispatch(storeFlag(processedItem.flag));

    if (!!processedItem.users.length) {
      store.dispatch(storeUsers(processedItem.users));
    }

    if (!!processedItem.signup) {
      store.dispatch(storeSignup(processedItem.signup));
    }

    if (!!processedItem.comment) {
      store.dispatch(storeComment(processedItem.comment));
    }

    if (!!processedItem.event) {
      store.dispatch(storeEvent(processedItem.event));
    }
  }

  return next(action);
};

export default flag;
