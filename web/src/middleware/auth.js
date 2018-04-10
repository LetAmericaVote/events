import {
  API_REQUEST_SUCCEEDED,
  POST_GOOGLE_ID_TOKEN,
  storeUser,
  storeAuthCredentials,
  postToApi,
} from '../actions';

const auth = store => next => action => {
  if (action.type === API_REQUEST_SUCCEEDED) {
    const { metaAction } = action;

    if (metaAction === POST_GOOGLE_ID_TOKEN) {
      store.dispatch(storeUser(action.data.user));
      store.dispatch(storeAuthCredentials(action.data.user.id, action.data.token.value));
    }
  } else if (action.type === POST_GOOGLE_ID_TOKEN) {
    const payload = { token: action.idToken };
    store.dispatch(postToApi(POST_GOOGLE_ID_TOKEN, 'auth', `/v1/auth/google`, payload));
  }

  return next(action);
};

export default auth;
