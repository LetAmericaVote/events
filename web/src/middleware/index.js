import api from './api';
import auth from './auth';
import comments from './comments';
import events from './events';
import hostLink from './hostLink';
import routing from './routing';
import signups from './signups';
import user from './user';

const middleware = [
  api,
  auth,
  comments,
  events,
  hostLink,
  routing,
  signups,
  user,
];

export default middleware;
