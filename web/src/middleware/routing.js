import createHistory from 'history/createBrowserHistory';
import { SET_PATH_NAME } from '../actions';

const routing = store => next => action => {
  if (action.type === SET_PATH_NAME) {
    const history = createHistory();
    history.push(action.pathname);
  }

  return next(action);
};

export default routing;
