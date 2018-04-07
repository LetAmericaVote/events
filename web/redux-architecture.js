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
      },
      '6789': {
        title: '...',
      },
    },
  }
};


// TODO: new api meta selecors
// TODO: update api reducer/selectors to nest the requests
