/**
 *
 */

const store = {
  api: {
    requests: {
      'abcd': {
        isPending: false,
      },
      'efgh': {
        isPending: false,
      },
    },
    actionMeta: {
      FETCH_EVENT_BY_ID: {
        endpoint: 'abcd',
        custom: {
          start: '1234',
        },
      },
    },
  }
  events: {
    items: {
      '12345': {
        title: '...',
        hostUser: '23456',
      },
      '6789': {
        title: '...',
      },
    },
  },
  users: {
    items: {
      '23456': {
        firstName: '...',
      },
    },
  },
};

// TODO: new api meta selecors
// TODO: update api reducer/selectors to nest the requests
