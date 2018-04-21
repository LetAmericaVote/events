import createHistory from 'history/createBrowserHistory';
import {
  selectIsModalOpen,
  selectRoutingPathname,
} from '../selectors';
import {
  SET_PATH_NAME,
  SET_INTERNAL_PATH_NAME,
  closeModal,
} from '../actions';

const routing = store => next => action => {
  const activePath = selectRoutingPathname(store.getState());

  if (action.type === SET_PATH_NAME &&
      activePath !== action.pathname) {

    const history = createHistory();
    history.push(action.pathname);
  }

  if (action.type === SET_PATH_NAME ||
    action.type === SET_INTERNAL_PATH_NAME) {

    if (selectIsModalOpen(store.getState())) {
      store.dispatch(closeModal());
    }
  }

  return next(action);
};

export default routing;
