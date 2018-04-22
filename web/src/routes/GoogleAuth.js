import Rivet from '../hoc/Rivet';
import {
  getBackUrl,
  resetBackUrl,
} from '../routing/authRedirect';
import {
  postGoogleIdToken,
  setPathname,
} from '../actions';

const GoogleAuth = (props) => {
  const {
    postGoogleIdToken,
    setPathname,
  } = props;

  const hashes = window.location.hash.split('&');
  const key = '#id_token=';
  const token = hashes.find(hash => hash.startsWith(key));

  if (token) {
    postGoogleIdToken(token.replace(key, ''));
  }

  const backPath = getBackUrl();
  resetBackUrl();

  setPathname(backPath);

  return null;
}

GoogleAuth.actionCreators = {
  setPathname,
  postGoogleIdToken,
};

export default Rivet(GoogleAuth);
