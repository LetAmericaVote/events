import {
  setPathname,
  SET_HOST_LINK,
  API_REQUEST_SUCCEEDED,
  storeEvent,
  storeUser,
  getFromApi,
} from '../actions';
import { makeEventRoute } from '../routing/routes';
import processEvent from '../processors/event';

const hostLink = store => next => action => {
  if (action.type === SET_HOST_LINK) {
    store.dispatch(getFromApi(SET_HOST_LINK, 'hostLink', `/v1/host/event/${action.value}`));
  } else if (action.type === API_REQUEST_SUCCEEDED
    && action.metaAction === SET_HOST_LINK) {

    const { data } = action;
    const { event } = data;

    if (! event) {
      return next(action);
    }

    const processedItem = processEvent(event);
    store.dispatch(storeEvent(processedItem.event));

    if (!!processedItem.user) {
      store.dispatch(storeUser(processedItem.user));
    }

    store.dispatch(setPathname(makeEventRoute(event.slug)));
  }

  return next(action);
};

export default hostLink;
