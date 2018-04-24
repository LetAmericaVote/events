import api from './api';
import auth from './auth';
import comments from './comments';
import events from './events';
import flag from './flag';
import hostLink from './hostLink';
import init from './init';
import location from './location';
import routing from './routing';
import search from './search';
import signups from './signups';
import user from './user';

const middleware = [
  api,
  auth,
  comments,
  events,
  flag,
  hostLink,
  init,
  location,
  routing,
  search,
  signups,
  user,
];

export default middleware;
