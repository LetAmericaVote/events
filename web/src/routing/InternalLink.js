import React from 'react';
import Rivet from '../hoc/Rivet';
import { setPathname } from '../actions';

const InternalLink = (props) => {
  const { children, to, setPathname, postRoute } = props;

  return React.cloneElement(children, {
    onClick: () => {
      setPathname(to);

      if (postRoute) {
        postRoute();
      }
    },
  });
};

InternalLink.actionCreators = {
  setPathname,
};

export default Rivet(InternalLink);
