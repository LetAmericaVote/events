import UrlPattern from 'url-pattern';
import Rivet from '../HOC/Rivet';
import { selectRoutingPathname } from '../selectors';

const RouteSwitch = (props) => {
  const { routes, defaultRouteRender, pathname } = props;

  const getMatch = (to) => {
    const pattern = new UrlPattern(to);
    return pattern.match(pathname);
  };

  const matchedRoute = Object.keys(routes)
    .find(to => getMatch(to) !== null);

  if (matchedRoute) {
    return routes[matchedRoute](getMatch(matchedRoute));
  }

  return defaultRouteRender ? defaultRouteRender() : null;
};

RouteSwitch.mapStateToProps = (state) => ({
  pathname: selectRoutingPathname(state),
});

export default Rivet(RouteSwitch);
