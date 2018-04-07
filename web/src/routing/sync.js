import createHistory from 'history/createBrowserHistory';
import { setInternalPathname } from '../actions';
import { selectRoutingPathname } from '../selectors';

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
  });
};

export default sync;
