import {
  API_REQUEST_SUCCEEDED,
  POST_GOOGLE_ID_TOKEN,
  storeUser,
  storeFlag,
  storeAuthCredentials,
  postToApi,
} from '../actions';
import processUser from '../processors/user';

const auth = store => next => action => {
  if (action.type === API_REQUEST_SUCCEEDED) {
    const { metaAction } = action;

    if (metaAction === POST_GOOGLE_ID_TOKEN) {
      const processedItem = processUser(action.data.user);

      if (processedItem.flag) {
        store.dispatch(storeFlag(processedData.flag));
      }

      store.dispatch(storeUser(processedData.user));
      store.dispatch(storeAuthCredentials(action.data.user.id, action.data.token.value));
    }
  } else if (action.type === POST_GOOGLE_ID_TOKEN) {
    const payload = { token: action.idToken };
    store.dispatch(postToApi(POST_GOOGLE_ID_TOKEN, 'auth', `/v1/auth/google`, payload));
  }

  return next(action);
};

export default auth;
