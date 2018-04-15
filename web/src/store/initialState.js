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
  forms: {
    items: {},
  },
  hostLink: null,
  location: {
    lon: null,
    lat: null,
    city: null,
    state: null
  },
  modal: {
    isOpen: false,
    type: false,
    props: null,
  },
  routing: {
    pathname: '',
    history: [],
  },
  search: {
    order: [],
    query: '',
    isPending: false,
    mode: 'query',
  },
  signups: {
    items: {},
  },
  users: {
    items: {},
  },
};

export default initialState;
