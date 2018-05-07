import ReactGA from 'react-ga';
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

    window.scrollTo(0, 0);
  }

  if (action.type === SET_PATH_NAME ||
    action.type === SET_INTERNAL_PATH_NAME) {

    ReactGA.pageview(action.pathname);

    if (selectIsModalOpen(store.getState())) {
      store.dispatch(closeModal());
    }
  }

  return next(action);
};

export default routing;
