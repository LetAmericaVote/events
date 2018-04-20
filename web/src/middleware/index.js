import api from './api';
import auth from './auth';
import comments from './comments';
import events from './events';
import hostLink from './hostLink';
import init from './init';
import location from './location';
import routing from './routing';
import signups from './signups';
import user from './user';

const middleware = [
  api,
  auth,
  comments,
  events,
  hostLink,
  init,
  location,
  routing,
  signups,
  user,
];

export default middleware;
