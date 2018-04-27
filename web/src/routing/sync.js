import createHistory from 'history/createBrowserHistory';
import {
  setInternalPathname,
  closeModal,
} from '../actions';
import {
  selectRoutingPathname,
  selectIsModalOpen,
} from '../selectors';

function getUrlParams(search) {
  const hashes = search.slice(search.indexOf('?') + 1).split('&');

  return hashes.reduce((acc, hash) => {
    const [key, val] = hash.split('=');
    acc[key] = decodeURIComponent(val);

    return acc;
  }, {});
}

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
