import {
  SET_SEARCH_RESULT_ORDER,
  fetchBulkEvents,
} from '../actions';
import {
  selectEvent,
} from '../selectors';
import { batchItems } from '../util';

const search = store => next => action => {
  if (action.type === SET_SEARCH_RESULT_ORDER) {
    const order = action.order;

    if (! order.length) {
      return next(action);
    }

    const missing = order.filter(eventId =>
      ! selectEvent(eventId, store.getState()) ||
      ! selectEvent(eventId, store.getState()).createdAt);

    if (! missing.length) {
      return next(action);
    }

    const batches = batchItems(missing);

    batches.forEach(batch =>
      store.dispatch(fetchBulkEvents(batch)));
  }

  return next(action);
};

export default search;
