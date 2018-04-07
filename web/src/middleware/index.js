import api from './api';
import events from './events';
import routing from './routing';

const middleware = [
  api,
  events,
  routing,
];

export default middleware;
