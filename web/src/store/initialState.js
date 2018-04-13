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
  location: {
    lon: null,
    lat: null,
    city: null,
    state: null
  },
  routing: {
    pathname: '',
    history: [],
  },
  search: {
    order: [],
    query: '',
    isPending: false,
  },
  signups: {
    items: {},
  },
  users: {
    items: {},
  },
};

export default initialState;
