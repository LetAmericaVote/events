import createReducer from './utils/createReducer';
import {
  API_REQUEST_INITIATED,
  API_REQUEST_SUCCEEDED,
  API_REQUEST_FAILED,
  WIPE_API_REQUEST,
  SET_API_ACTION_META_ENDPOINT,
  SET_API_ACTION_META_PROPERTY,
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
  requests: {
    ...state.requests,
    [action.endpoint]: {
      ...(state.requests[action.endpoint] || {}),
      ...getRelevantProps(action),
    },
  },
});

const setApiActionMeta = (state, action) => ({
  ...state,
  meta: {
    ...state.meta,
    [action.metaAction]: {
      ...(state.meta[action.metaAction] || {}),
      [action.space]: {
        ...((state.meta[action.metaAction] || {})[action.space] || {}),
        ...(() => {
          switch (action.type) {
            case SET_API_ACTION_META_ENDPOINT: return {
              endpoint: action.endpoint,
            };

            case SET_API_ACTION_META_PROPERTY: return {
              custom: {
                ...(((state.meta[action.metaAction] || {})[action.space] || {}).custom || {}),
                [action.property]: action.value,
              },
            };

            default: return {};
          }
        })(),
      },
    },
  },
});

const api = createReducer('api', {
  [API_REQUEST_INITIATED]: setApiStatus,
  [API_REQUEST_SUCCEEDED]: setApiStatus,
  [API_REQUEST_FAILED]: setApiStatus,
  [WIPE_API_REQUEST]: setApiStatus,
  [SET_API_ACTION_META_ENDPOINT]: setApiActionMeta,
  [SET_API_ACTION_META_PROPERTY]: setApiActionMeta,
});

export default api;
