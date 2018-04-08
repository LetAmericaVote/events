import {
  selectActionMetaNameForEndpoint
} from '../selectors';
import {
  API_REQUEST_SUCCEEDED,
  POST_GOOGLE_ID_TOKEN,
  storeUser,
  storeAuthCredentials,
  postToApi,
} from '../actions';

const auth = store => next => action => {
  if (action.type === API_REQUEST_SUCCEEDED) {
    const metaActionName = selectActionMetaNameForEndpoint(action.endpoint, store.getState());

    if (metaActionName === POST_GOOGLE_ID_TOKEN) {
      store.dispatch(storeUser(action.data.user));
      store.dispatch(storeAuthCredentials(action.data.user.id, action.data.token.value));
    }
  } else if (action.type === POST_GOOGLE_ID_TOKEN) {
    const payload = { token: action.idToken };
    store.dispatch(postToApi(POST_GOOGLE_ID_TOKEN, `/v1/auth/google`, payload));
  }

  return next(action);
};

export default auth;
