import api from './api';
import events from './events';
import routing from './routing';
import user from './user';

const middleware = [
  api,
  events,
  routing,
  user,
];

export default middleware;
