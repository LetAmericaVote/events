const initialState = {
  api: {
    requests: {},
    meta: {},
  },
  auth: {
    userId: null,
    token: null,
  },
  comments: {
    items: {},
  },
  events: {
    items: {},
  },
  flag: {
    items: {},
  },
  forms: {
    items: {},
  },
  hostLink: null,
  init: {},
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
