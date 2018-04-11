import React from 'react';
import Rivet from '../hoc/Rivet';
import { setPathname } from '../actions';

const InternalLink = (props) => {
  const { children, to, setPathname } = props;

  return React.cloneElement(children, {
    onClick: () => setPathname(to),
  });
};

InternalLink.actionCreators = {
  setPathname,
};

export default Rivet(InternalLink);
