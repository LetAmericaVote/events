import createReducer from './utils/createReducer';
import {
  API_REQUEST_INITIATED,
  API_REQUEST_SUCCEEDED,
  API_REQUEST_FAILED,
  WIPE_API_REQUEST,
} from '../actions';

const getRelevantProps = (action) => {
  const { type, data, error } = action;

  switch (type) {
    case API_REQUEST_INITIATED: return {
      isPending: true,
      isSuccess: false,
      hasFailed: false,
      data: null,
      error: null,
    };

    case API_REQUEST_SUCCEEDED: return {
      isPending: false,
      isSuccess: true,
      hasFailed: false,
      data,
      error: null,
    };

    case API_REQUEST_FAILED: return {
      isPending: false,
      isSuccess: false,
      hasFailed: true,
      data: null,
      error,
    };

    case WIPE_API_REQUEST: return {
      isPending: false,
      isSuccess: false,
      hasFailed: false,
      data: null,
      error: null,
    };

    default: return {};
  }
};

const setApiStatus = (state, action) => ({
  ...state,
  endpoint: {
    ...(state[action.endpoint] || {}),
    ...getRelevantProps(action),
  },
});

const api = createReducer('api', {
  [API_REQUEST_INITIATED]: setApiStatus,
  [API_REQUEST_SUCCEEDED]: setApiStatus,
  [API_REQUEST_FAILED]: setApiStatus,
  [WIPE_API_REQUEST]: setApiStatus,
});

export default api;
