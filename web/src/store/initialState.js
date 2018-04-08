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
  routing: {
    pathname: '',
    history: [],
  },
  users: {
    items: {},
  },
};

export default initialState;
