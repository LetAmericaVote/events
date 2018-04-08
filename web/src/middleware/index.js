import api from './api';
import auth from './auth';
import comments from './comments';
import events from './events';
import routing from './routing';
import signups from './signups';
import user from './user';

const middleware = [
  api,
  auth,
  comments,
  events,
  routing,
  signups,
  user,
];

export default middleware;
