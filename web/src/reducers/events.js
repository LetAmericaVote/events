import createReducer from './utils/createReducer';
import {
  STORE_EVENT,
  STORE_EVENTS,
} from '../actions';

const storeEvents = (state, events) => ({
  ...state,
  items: {
    ...state.items,
    ...events.reduce((acc, event) => {
      acc[event.id] = {
        ...(state.items[event.id] || {}),
        ...event,
      };

      return acc;
    }, {}),
  },
});

const events = createReducer('events', {
  [STORE_EVENT]: (state, action) =>
    storeEvents(state, [action.event]),
  [STORE_EVENTS]: (state, action) =>
    storeEvents(state, action.events),
});

export default events;
