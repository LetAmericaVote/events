import React from 'react';
import UrlPattern from 'url-pattern';
import Rivet from '../Rivet';
import { selectRoutingPathname } from '../selectors';

const Route = (props) => {
  const { children, pathname, to } = props;

  const pattern = new UrlPattern(to);
  const match = pattern.match(pathname);

  if (match === null) {
    return null;
  }

  const mapChildWithMatch = child =>
    React.cloneElement(child, { match });

  return React.Children.map(children, mapChildWithMatch);
};

Route.mapStateToProps = (state) => ({
  pathname: selectRoutingPathname(state),
});

export default Rivet(Route);
