import createHistory from 'history/createBrowserHistory';
import {
  setInternalPathname,
  closeModal,
} from '../actions';
import {
  selectRoutingPathname,
  selectIsModalOpen,
} from '../selectors';

const sync = (store) => {
  const history = createHistory();

  const updatePathFromLocation = (location) =>
    store.dispatch(setInternalPathname(location.pathname));

  updatePathFromLocation(window.location);

  history.listen((location) => {
    const storePath = selectRoutingPathname(store.getState());

    if (location.pathname !== storePath) {
      updatePathFromLocation(location);
    }

    if (selectIsModalOpen(store.getState())) {
      store.dispatch(closeModal());
    }
  });
};

export default sync;
