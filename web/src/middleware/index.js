import api from './api';
import auth from './auth';
import events from './events';
import routing from './routing';
import user from './user';

const middleware = [
  api,
  auth,
  events,
  routing,
  user,
];

export default middleware;
