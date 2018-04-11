const initialState = {
  api: {
    requests: {},
    meta: {},
  },
  auth: {
    userId: null,
    token: null,
  },
  events: {
    items: {},
  },
  hostLink: null,
  routing: {
    pathname: '',
    history: [],
  },
  search: {
    order: [],
    query: '',
  },
  signups: {
    items: {},
  },
  users: {
    items: {},
  },
};

export default initialState;
